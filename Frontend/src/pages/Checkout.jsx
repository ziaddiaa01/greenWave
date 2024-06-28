import React, { useState } from "react";
import { useLoaderData, Form, Await, defer } from "react-router-dom";
import { getOrderInfo, submitPayment } from "../api"; // Adjust import paths as necessary

// Regular expressions for credit card validation
const cardNumberRegex = /^[0-9]{16}$/;
const cvvRegex = /^[0-9]{3,4}$/;

export async function loader({ params }) {
  const { userID } = params;
  return defer({ orderInfo: await getOrderInfo(userID) });
}

export async function action({ request, loader }) {
  const formData = await request.formData();
  const { orderInfo } = await loader;

  try {
    const paymentType = formData.get("paymentType");

    if (paymentType === "creditCard") {
      const cardNumber = formData.get("cardNumber");
      const cvv = formData.get("cvv");

      // Validation
      if (!cardNumberRegex.test(cardNumber)) {
        throw new Error("Please enter a valid 16-digit card number.");
      }

      if (!cvvRegex.test(cvv)) {
        throw new Error("Please enter a valid CVV (3 or 4 digits).");
      }
    }

    let paymentData = {
      ...orderInfo,
      paymentType: paymentType,
      paymentInfo: {
        cardNumber: formData.get("cardNumber"),
        expiryDate: formData.get("expiryDate"),
        cvv: formData.get("cvv"),
        // Add more payment fields as needed
      },
    };

    // Add deliveryInfo if paymentType is cash on delivery
    if (paymentType === "cash") {
      paymentData = {
        ...paymentData,
        deliveryInfo: {
          fullName: formData.get("fullName"),
          address: formData.get("address"),
          phoneNumber: formData.get("phoneNumber"),
        },
      };
    }

    await submitPayment(paymentData);
    console.log("Payment submitted successfully!");
    // Handle successful payment submission (e.g., redirect or show success message)
  } catch (error) {
    console.error("Payment submission error:", error.message);
    // Handle error gracefully (e.g., show error message to user)
    throw error; // Propagate error to handle it in the UI or further up the chain
  }
}

function Checkout() {
  const { orderInfo } = useLoaderData();
  const [paymentType, setPaymentType] = useState("cash"); // Default to cash on delivery
  const [cardType, setCardType] = useState(""); // State to track selected card type
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
  });

  const handleCardTypeSelect = (type) => {
    setCardType(type);
  };

  const handlePaymentTypeSelect = (type) => {
    setPaymentType(type);
  };

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="container w-fit mx-auto p-4">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-4">Checkout</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Summary
        </h3>
        <React.Suspense fallback={<p>Loading order summary...</p>}>
          <Await resolve={orderInfo}>
            <ul>
              {orderInfo[0].items.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: {item.quantity} - Price: EGP{" "}
                  {item.price}
                </li>
              ))}
            </ul>
          </Await>
        </React.Suspense>
        <h3 className="text-lg font-medium text-gray-900 mt-6">
          Payment Information
        </h3>
        <Form method="post">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Price ( include shipping )
            </label>
            <p className="text-lg font-semibold text-gray-900">
              EGP {orderInfo[0].totalPrice + orderInfo[0].shipping}
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
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Card Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`p-2 rounded-full ${
                      cardType === "visa"
                        ? "bg-[#1A78AE] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleCardTypeSelect("visa")}
                  >
                    Visa
                  </button>
                  <button
                    type="button"
                    className={`p-2 rounded-full ${
                      cardType === "mastercard"
                        ? "bg-[#F36C3E] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleCardTypeSelect("mastercard")}
                  >
                    MasterCard
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  className="mt-1 outline-none  block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  className="mt-1 outline-none  block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  className="mt-1  outline-none block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          )}
          {paymentType === "cash" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mt-6">
                Delivery Information
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleDeliveryInfoChange}
                  className="mt-1 outline-none  block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleDeliveryInfoChange}
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
                  onChange={handleDeliveryInfoChange}
                  className="outline-none mt-1 block w-full border-b-2 border-gray-300 rounded-none focus:border-[#2DA884] focus:ring focus:ring-[#2DA884] focus:ring-opacity-50"
                  required
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
