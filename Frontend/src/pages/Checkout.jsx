import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLoaderData, Form, Await, defer , useActionData} from "react-router-dom";
import { getUserShoppingCart, createOrder } from "../api"; // Adjust import paths as necessary

const stripePromise = loadStripe(
  "pk_test_51PYsg0A0wlgj8WulIWrGbuisbtzlefi15vDoDNgwiB7ZzmrrRkOtp8SfX8GtNI35G9Y7L9SZHTKP0QMShnqq1p5z00nJOkKhB0"
);

export async function loader() {
  const cart = await getUserShoppingCart();
  const cartItems = cart.cart;
  return defer({ cartItems });
}

export async function action({ request }) {
  const formData = await request.formData();

    const paymentType = formData.get("paymentType");
    const cart = await getUserShoppingCart();
    const cartItems = cart.cart;

    let paymentData = {
      items: cartItems.items.map((item) => {
        if (item.productId) {
          return {
            product: {
              productId: item.productId._id,
              quantity: item.quantity,
            },
            
          };
        } else if (item.bookId) {
          return {
            book: {
              bookId: item.bookId._id,
              quantity:item.quantity,
            },
            
          };
        } else if (item.courseId) {
          return {
            course: {
              courseId: item.courseId._id,
              quantity: item.quantity,
            },
            
          };
        }
        return null;
      }),
      address: formData.get("address"),
      phone: formData.get("phoneNumber"),
      notes: formData.get("notes"),
      coupon: formData.get("coupon"),
      paymentMethod: paymentType,
    };
    const response = await createOrder(paymentData);
    if(response.order){
      return "order created successfully"
    }
    else{
      return "order creation failed"
    }
}


const  CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);



  const handleSubmit = async (event) => {
    
    event.preventDefault();

    try {
      if (!stripe || !elements) {
        console.error("Stripe.js has not loaded yet.");
        return;
      }

      // Submit payment elements
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      // Confirm payment with clientSecret
      const clientSecret = "sk_test_51PYsg0A0wlgj8WulliiEXCpzg9up1Rl2y7DwkNqAZFAk0SAGiaX8cHxmf51yW2OpCGD6kKSzIy73cP7TVT4iSDoz00HY7g8ZDn";
      const { paymentIntent, error } = await stripe.confirmPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(PaymentElement),
          billing_details: {},
        },
        confirmParams: {
          return_url: '/thanks', 
        },
      });

      // Handle payment errors
      if (error) {
        console.error("Payment confirmation error:", error.message);
        setErrorMessage("Payment confirmation error. Please try again.");
      }
      // Handle successful payment
      else if (paymentIntent) {
        console.log("Payment succeeded:", paymentIntent);
      }
      // Handle unexpected payment state
      else {
        console.log("Unhandled payment state:", paymentIntent);
        setErrorMessage("Unhandled payment state.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      setErrorMessage("Error processing payment. Please try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        className="w-full bg-[#2DA884] text-white py-2 px-4 rounded-md text-sm font-medium mt-4"
        disabled={!stripe || !elements}
      >
        Place Order
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const Checkout = () => {
  const { cartItems } = useLoaderData();
  const errorMessage = useActionData();
  const [paymentType, setPaymentType] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    phoneNumber: "",
    notes: "",
    coupon:"",
  });

  const handlePaymentTypeSelect = (type) => {
    setPaymentType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const subtotal = cartItems.items.reduce((acc, item) => {
    const price = item.productId
      ? item.productId.price
      : item.bookId
      ? item.bookId.price
      : item.courseId.price;
    return acc + item.quantity * price;
  }, 0);

  const options = {
    mode: "payment",
    amount: subtotal * 100,
    currency: "egp",
    appearance: {
      /*...*/
    },
  };
  let errorMessageColor = "";
  if (errorMessage && errorMessage.toLowerCase().includes("failed")) {
    errorMessageColor = "text-red-500"; 
  } else if (errorMessage) {
    errorMessageColor = "text-green-500"; 
  }
  return (
    <div className="container w-fit mx-auto p-4">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-4">
        Checkout
      </h2>
      {errorMessage && <h3 className={`${errorMessageColor} font-bold text-center mt-1`}>{errorMessage.replace(/"/g, '')}</h3>}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Summary
        </h3>
        <React.Suspense fallback={<p>Loading order summary...</p>}>
          <Await resolve={cartItems}>
            {(resolvedCartItems) => (
              <ul>
                {resolvedCartItems.items.map((item) => {
                  const itemDetails =
                    item.productId || item.bookId || item.courseId;
                  return (
                    <li key={item._id}>
                      {itemDetails.name} - Quantity: {item.quantity} - Price:
                      EGP {(item.quantity * itemDetails.price).toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            )}
          </Await>
        </React.Suspense>
        <h3 className="text-lg font-medium text-gray-900 mt-6">
          Payment Information
        </h3>
        <Form method="post">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Price (include shipping and taxes)
            </label>
            <p className="text-lg font-semibold text-gray-900">
              EGP {subtotal > 0 ? (subtotal + 5 + 0.1 * subtotal).toFixed(2) : 0}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  paymentType === "Cash"
                    ? "bg-[#2DA884] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePaymentTypeSelect("Cash")}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  paymentType === "Card"
                    ? "bg-[#2DA884] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePaymentTypeSelect("Card")}
              >
                Credit Card
              </button>
            </div>
          </div>
          <input type="hidden" name="paymentType" value={paymentType}></input>
          {paymentType === "Cash" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mt-6">
                Delivery Information
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={deliveryInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="outline-none mt-1 block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={deliveryInfo.notes}
                  onChange={handleInputChange}
                  className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    value={deliveryInfo.coupon}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  />
                </div>
              <button
                type="submit"
                className="w-full bg-[#2DA884] text-white py-2 px-4 rounded-md text-sm font-medium mt-4"
              >
                Place Order
              </button>
            </div>
          )}
          {paymentType === "Card" && (
            <div >
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mt-6">
                  Delivery Information
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={deliveryInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="outline-none mt-1 block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={deliveryInfo.notes}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    value={deliveryInfo.coupon}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  />
                </div>
              </div>
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm deliveryInfo={deliveryInfo} />
              </Elements>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Checkout;