import { StatusCodes } from 'http-status-codes';
import cartModel from '../../../DB/model/cart.model.js';
import productModel from '../../../DB/model/product.model.js';
import { ErrorClass } from "../../utils/errorClass.js"
import bookModel from '../../../DB/model/book.model.js';
import courseModel from '../../../DB/model/course.model.js';

// 1] Add Product to Cart
export const addItemToCart = async (req, res, next) => {
    const { productId, bookId, courseId, quantity } = req.body;

    if (!productId && !bookId && !courseId) {
        return next(new Error("No item provided to add to cart", StatusCodes.NOT_FOUND));
    }

    let itemId;
    let itemModel;
    let itemType; // To determine the type of item for price handling

    if (productId) {
        itemId = productId;
        itemModel = productModel;
        itemType = 'product';
    } else if (bookId) {
        itemId = bookId;
        itemModel = bookModel;
        itemType = 'book';
    } else if (courseId) {
        itemId = courseId;
        itemModel = courseModel;
        itemType = 'course';
    }

    try {
        const item = await itemModel.findById(itemId);

        if (!item) {
            return next(new Error("Item not found!", StatusCodes.NOT_FOUND));
        }

        // Check if item is out of stock
        if (itemType === 'product' && item.stock < quantity) {
            await productModel.updateOne(
                { _id: itemId },
                {
                    $addToSet: {
                        wishlist: req.user._id
                    }
                }
            );
            return next(new ErrorClass("Out of stock! The product has been added to your wishlist.", StatusCodes.BAD_REQUEST));
        }

        let cart = await cartModel.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new cartModel({ userId: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(cartItem =>
            cartItem.productId?.toString() === itemId ||
            cartItem.bookId?.toString() === itemId ||
            cartItem.courseId?.toString() === itemId
        );

        const newItem = {
            [`${itemType}Id`]: itemId,
            quantity,
            price: item.price // Add price information
        };

        if (itemIndex === -1) {
            cart.items.push(newItem);
        } else {
            cart.items[itemIndex].quantity += quantity;
        }

        await cart.save();
        res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
        next(error);
    }
};

// 2] Remove item from Cart
export const removeItemFromCart = async (req, res) => {

    const { itemId } = req.params;

    let cart = await cartModel.findOne({userId: req.user._id});
    if (!cart) {
        return next (new ErrorClass("Cart is not found",StatusCodes.NOT_FOUND))
    }

    // Check if the item exists in the cart
    const itemIndex = cart.items.findIndex((item) =>
        item.productId?.toString() === itemId ||
        item.bookId?.toString() === itemId ||
        item.courseId?.toString() === itemId
    );

    if (itemIndex === -1) {
        return next (new ErrorClass("Item not found in cart",StatusCodes.NOT_FOUND))
    }

    const updatedCart = await cartModel.findOneAndUpdate(
        {userId:req.user._id},
        {
            $pull:{
                items:{
                    $or:[
                        {productId:itemId},
                        {bookId:itemId},
                        {courseId:itemId}
                    ]
                }
            }
        },
        {new:true}
    )

    // Check if the item was actually removed
    const itemExists = updatedCart.items.some(
        (item) => item.productId?.toString() === itemId ||
                  item.bookId?.toString() === itemId ||
                  item.courseId?.toString() === itemId
    );

    if (itemExists) {
        return next (new ErrorClass("Item not found in cart",StatusCodes.NOT_FOUND))
    }
    return res.status(StatusCodes.OK).json({ message: "Item removed from cart", cart: updatedCart });
};

// 3] Get Cart Items
export const getCartItems = async (req, res) => {
    const cart = await cartModel.findOne({userId:req.user._id})
    .populate('items.productId','name  price')
    .populate('items.bookId','title name author price')
    .populate('items.courseId','title name instructor price');

    if(!cart)
    {
        return next(new ErrorClass("Cart not found", StatusCodes.NOT_FOUND));
    }
    return res.status(StatusCodes.OK).json({ cart });
};
