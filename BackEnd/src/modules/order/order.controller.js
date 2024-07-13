import Stripe from "stripe";
import cartModel from "../../../DB/model/cart.model.js";
import { couponModel } from "../../../DB/model/coupon.model.js";
import productModel from "../../../DB/model/product.model.js";
import { StatusCodes } from "http-status-codes";
import bookModel from "../../../DB/model/book.model.js";
import courseModel from "../../../DB/model/course.model.js";
import ordermodel from "../../../DB/model/order.model.js";
import { ErrorClass } from "../../utils/errorClass.js";
import { ObjectId } from 'mongodb';
import {fileURLToPath} from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import path from "path";
import sendEmail from "../../utils/email.js";
import { createInvoice } from "../../utils/createInvoice.js";
import fs from "fs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createOrder = async (req, res, next) => {
    let product, itemTypeModel;
    let { items, address, phone, note, coupon, paymentMethod } = req.body;
    const userId = req.user._id;

    // Coupon Part
    if (coupon) {
        const isCouponExist = await couponModel.findOne({ code: coupon });
        if (!isCouponExist) {
            return next(new ErrorClass("Invalid coupon!", 404));
        }
        if (isCouponExist.UsedBy.length >= isCouponExist.numofUses) {
            return next(new ErrorClass("This coupon exceeded the usage limit", 410));
        }
        if (isCouponExist.UsedBy.includes(req.user._id)) {
            return next(new ErrorClass("You've already claimed this coupon", 410));
        }
        req.body.coupon = isCouponExist; // Store the whole coupon object for later use
    }

    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!items) {
        if (!cart.items.length) {
            return next(new ErrorClass('CART IS EMPTY!', StatusCodes.NOT_FOUND));
        }
        items = cart.items;
    }

    const existedItems = [];
    const foundedIds = [];
    const arrayForStock = [];
    let totalPrice = 0;

    for (let item of items) {
        if (item.product && item.product.productId) {
            itemTypeModel = productModel;
            product = await itemTypeModel.findById(item.product.productId);
        } else if (item.book && item.book.bookId) {
            itemTypeModel = bookModel;
            product = await itemTypeModel.findById(item.book.bookId);
        } else if (item.course && item.course.courseId) {
            itemTypeModel = courseModel;
            product = await itemTypeModel.findById(item.course.courseId);
        } else {
            return next(new ErrorClass('Invalid item type', StatusCodes.BAD_REQUEST));
        }

        if (!product) {
            return next(new ErrorClass(`Item with id ${item.itemId} not found`, StatusCodes.NOT_FOUND));
        }

        existedItems.push({
            product: item.product ? {
                productId: product._id,
                name: product.name,
                price: product.price,
                paymentPrice: product.paymentPrice,
                quantity: item.product.quantity
            } : undefined,
            book: item.book ? {
                bookId: product._id,
                name: product.name,
                author: product.author,
                genre: product.genre,
                price: product.price,
                quantity: item.book.quantity
            } : undefined,
            course: item.course ? {
                courseId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.course.quantity
            } : undefined,
        });
        foundedIds.push(product._id);

        if (!item.course) { // Courses do not have stock
            arrayForStock.push({
                _id: product._id,
                quantity: item.product ? item.product.quantity : item.book.quantity
            });
        }
        totalPrice += product.price * (item.product ? item.product.quantity : item.book ? item.book.quantity : item.course.quantity);
    }

    // Apply coupon if exists
    let discount = 0;
    if (coupon) {
        const foundCoupon = req.body.coupon;
        if (foundCoupon && foundCoupon.$isValid) {
            discount = foundCoupon.amount;
            totalPrice -= discount;
        } else {
            return next(new ErrorClass('Invalid or expired coupon', StatusCodes.BAD_REQUEST));
        }
    }

    // Update Stock
    for (let item of arrayForStock) {
        try {
            const product = await itemTypeModel.findById(item._id);
            if (!product) {
                return next(new ErrorClass(`Item with id ${item._id} not found`, StatusCodes.NOT_FOUND));
            }
            if (product.stock < item.quantity) {
                return next(new ErrorClass(`Item with id ${item._id} has insufficient stock`, StatusCodes.BAD_REQUEST));
            }
            product.stock -= item.quantity;
            await product.save();
        } catch (error) {
            return next(new ErrorClass(`Error updating stock for item with id ${item._id}: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

    const order = new ordermodel({
        userId: req.user._id,
        items: existedItems,
        address,
        phone,
        note,
        coupon: req.body.coupon._id,
        price: totalPrice,
        paymentPrice: totalPrice,
        paymentMethod,
    });
    const invoice = {
        customer:{
            id: order._id,
            email: req.user.email,
            TotalPrice: order.paymentPrice,
            name: req.user.name,
            address
        },
        items: existedItems.map(product => {
            let itemName;
            let itemQuantity;
            let itemPrice;
            
            if (product.product) {
                itemName = product.product.name;
                itemQuantity = product.product.quantity;
                itemPrice = product.product.paymentPrice;
            } else if (product.book) {
                itemName = product.book.title;
                itemQuantity = product.book.quantity;
                itemPrice = product.book.price;
            } else if (product.course) {
                itemName = product.course.title;
                itemQuantity = product.course.quantity;
                itemPrice = product.course.price;
            }
            return {
                item:itemName,
                quantity: itemQuantity,
                amount: itemPrice * 100,
                lineTotal : itemPrice * itemQuantity
            }
        }),
        subtotal: totalPrice,
    }
    const pdfPath = path.join(__dirname, `../../utils/pdf/${req.user._id}.pdf`)
    createInvoice(invoice, pdfPath);
    await sendEmail({
        to: req.user.email, subject: "Invoice", attachments: [{
            filename: 'order invoice',
            path: pdfPath,
            contentType: 'application/pdf'
        }]
    })
    fs.unlinkSync(pdfPath)
    // Use Stripe For Payment
    if (paymentMethod === 'Card') {
        try {
            if (req.body.coupon) {
                const coupon = await stripe.coupons.create({
                    percent_off: req.body.coupon.amount,
                    duration: "once"
                });
                req.body.StripeCoupon = coupon.id;
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                customer_email: req.user.email,
                metadata: {
                    orderId: order._id.toString()
                },
                success_url: `http://localhost:3000/order/complete?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:3000/order/cancel`,
                discounts: req.body.StripeCoupon ? [{ coupon: req.body.StripeCoupon }] : [],
                line_items: existedItems.map(element => {
                    return {
                        price_data: {
                            currency: 'EGP',
                            product_data: {
                                name: element.product ? element.product.name : element.book ? element.book.title : element.course.title
                            },
                            unit_amount: (element.product ? element.product.paymentPrice : element.book ? element.book.price : element.course.price) * 100
                        },
                        quantity: element.product ? element.product.quantity : element.book ? element.book.quantity : element.course.quantity
                    };
                })
            });

            if (req.body.coupon) {
                await couponModel.updateOne({ code: req.body.coupon.code }, {
                    $addToSet: { UsedBy: req.user._id }
                });
            }

            // Remove items from cart
            await cartModel.updateOne(
                { userId: req.user._id },
                { $set: { items: [] } } // Clear all items in the cart
            );

            return res.status(200).json({ message: "DONE", order, url: session.url });
        } catch (error) {
            return next(new ErrorClass(`Error processing payment: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

    // Remove items from cart
    await cartModel.updateOne(
        { userId: req.user._id },
        { $set: { items: [] } } // Clear all items in the cart
    );

    // Update coupon usage for cash payments
    if (req.body.coupon) {
        await couponModel.updateOne({ code: req.body.coupon.code }, {
            $addToSet: { UsedBy: req.user._id }
        });
    }

    // Save Order
    try {
        await order.validate();
        await order.save();
        res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
        return next(new ErrorClass(`Error saving order: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR));
    }
};


// Get all orders for a user (Orders Hostory)
export const getUserOrders = async (req, res, next) => {
    try {
        const userId  = req.user._id;
        const orders = await ordermodel.find({ userId ,
            status:{
                $nin : ['cancelled']
            }
        }     
        )
        .select('address items paymentPrice status notes phone createdAt paymentMethod')
        if(orders.length==0){
            return next(new ErrorClass("no orders were found for this user",StatusCodes.NOT_FOUND))
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update order status --> Tracking
export const updateOrderStatus = async (req, res,next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await ordermodel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// cancel order
export const cancelOrder = async (req, res, next) => {
    const { orderId } = req.params; // Destructure orderId from req.params
    const id = new ObjectId(orderId); // Convert orderId to ObjectId
    const userId = req.user._id;
    const { cancelReason } = req.body; // Extract reason from req.body
    console.log(id, userId, cancelReason); // Log the converted id
  
    try {
      const isOrderExist = await ordermodel.findOne({ _id: id, userId }); // Use id instead of orderId
      if (!isOrderExist) {
        return next(new ErrorClass("This order doesn't exist or you do not own this order!", StatusCodes.NOT_FOUND));
      }
  
      // Check if the order is already delivered
      if (isOrderExist.status === 'delivered') {
        return next(new ErrorClass("This order has already been delivered", StatusCodes.FORBIDDEN));
      }
  
      // Update the order status and reason
      await ordermodel.findByIdAndUpdate(id, {
        status: 'cancelled',
        reason: cancelReason, // Assign the reason from req.body
      });
  
      return res.status(200).json({ message: "Order Cancelled Successfully" });
    } catch (error) {
      console.error("Error cancelling order:", error);
      next(error); // Forward error to the error handling middleware
    }
  };
  export const getOrderById = async (req, res, next) => {
    const { orderId } = req.params; // Destructure orderId from req.params
    const id = new ObjectId(orderId); // Convert orderId to ObjectId
  
    try {
      const order = await ordermodel.findById(id); // Find the order by ID
      if (!order) {
        return next(new ErrorClass("Order not found", StatusCodes.NOT_FOUND));
      }
      res.status(StatusCodes.OK).json(order); // Return the order details
    } catch (error) {
      console.error("Error fetching order:", error);
      next(error); // Forward error to the error handling middleware
    }
  };