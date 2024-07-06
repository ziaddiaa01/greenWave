import React, { useState } from "react";
import { useLoaderData, Form, Await, defer, redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement , useStripe , useElements} from "@stripe/react-stripe-js";
import { getUserShoppingCart, createOrder } from "../api"; // Adjust import paths as necessary

const stripePromise = loadStripe("pk_test_51PYsg0A0wlgj8WulIWrGbuisbtzlefi15vDoDNgwiB7ZzmrrRkOtp8SfX8GtNI35G9Y7L9SZHTKP0QMShnqq1p5z00nJOkKhB0"); 

export async function loader() {
  const cart = await getUserShoppingCart();
  const cartItems = cart.cart;
  return defer({ cartItems });
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    const paymentType = formData.get("paymentType");
    const cart = await getUserShoppingCart();
    const cartItems = cart.cart;

    let paymentData = {
      items: cartItems.items.map((item) => ({
        itemType: item.productId ? "Product" : item.bookId ? "Book" : "Course",
        itemId: item.productId
          ? item.productId._id
          : item.bookId
          ? item.bookId._id
          : item.courseId._id,
        quantity: item.quantity,
      })),
      address: formData.get("address"),
      phone: formData.get("phoneNumber"),
      notes: formData.get("notes"),
      paymentMethod: paymentType === "creditCard" ? "Card" : "Cash",
    };

    if (paymentType === "creditCard") {
      const stripe = await stripePromise;
      const elements = stripe.elements();
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod: stripePaymentMethod, error } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            address: {
              line1: formData.get("address"),
              postal_code: "12345", // Replace with actual postal code
              city: "City Name", // Replace with actual city
              state: "State Name", // Replace with actual state
              country: "Country Name", // Replace with actual country
            },
          },
          options: {
            clientSecret: "sk_test_51PYsg0A0wlgj8WulliiEXCpzg9up1Rl2y7DwkNqAZFAk0SAGiaX8cHxmf51yW2OpCGD6kKSzIy73cP7TVT4iSDoz00HY7g8ZDn",
          },
        });

      if (error) {
        throw new Error(error.message);
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "/",
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      paymentData = {
        ...paymentData,
        paymentInfo: {
          paymentMethodId: stripePaymentMethod.id,
        },
      };
    }

    const response = await createOrder(paymentData);
    console.log("Payment submitted successfully!", response);
    return redirect("/");
  } catch (error) {
    console.error("Payment submission error:", error.message);
    throw error;
  }
}


function Checkout() {
  const { cartItems } = useLoaderData();
  const [paymentType, setPaymentType] = useState(""); 
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    phoneNumber: "",
    notes: "",
    coupon: "",
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
  return (
    <div className="container w-fit mx-auto p-4">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-4">
        Checkout
      </h2>
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
                EGP {(subtotal + 5 + 0.1 * subtotal).toFixed(2)}
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
                    paymentType === "cash"
                      ? "bg-[#2DA884] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePaymentTypeSelect("cash")}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    paymentType === "creditCard"
                      ? "bg-[#2DA884] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePaymentTypeSelect("creditCard")}
                >
                  Credit Card
                </button>
              </div>
            </div>
            {paymentType === "creditCard" && (
              <Elements stripe={stripePromise}>
              <div>
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
                      rows={3}
                    />
                  </div>

                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <CardElement
                    name="CardElement"
                    className="mt-1 outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              </Elements>
            )}
            {paymentType === "cash" && (
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
              </div>
            )}
            <button
              type="submit"
              className="bg-[#2DA884] block text-white w-fit mx-auto my-2 text-sm font-bold p-4 rounded-md transition-colors duration-300 hover:bg-white hover:text-[#2DA884] border border-[#2DA884]"
            >
              Submit Payment
            </button>
          </Form>
        
      </div>
    </div>
  );
}

export default Checkout;
