import React, { useState } from "react";
import { useLoaderData, Form, useParams, defer, Await } from "react-router-dom";
import {
  getUserShoppingCart,
  submitOrderSummary,
  getProduct,
  addItemToCart,
  removeItemFromCart,
  removeItemCompletelyFromCart,
} from "../api"; 

export async function action({ request }) {
  const formData = await request.formData();
  const orderData = {
    userID: formData.get("userID"),
    items: [],
    total : formData.get("total")
  };
  formData.forEach((value, key) => {
    if (key.startsWith("quantity-")) {
      const id = key.split("-")[1]; 
      orderData.items.push({ id, quantity: parseInt(value) });
    }
  });
  try {
    const response = await submitOrderSummary(orderData);
    if(response.status == 200) {
      window.location.href = "/checkout/userID";

    }
  } catch (err) {
    return err.message;
  }
 
}

export async function loader({ params }) {
  const userID = params.userID;
  const cartItems = await getUserShoppingCart(userID);
  const products = await Promise.all(
    cartItems.map((item) => getProduct(item.id))
  );
  return defer({ cartItems, products });
}

export default function ShoppingCart() {
  const { cartItems: initialCartItems, products } = useLoaderData();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [quantities, setQuantities] = useState(
    initialCartItems.map((item) => item.quantity || 1)
  );
  const { userID } = useParams();

  const handleQuantityChange = async (index, newQuantity, itemID) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);

    if (newQuantity > 0) {
      if (newQuantity > quantities[index]) {
        const response = await addItemToCart(userID, itemID);
        if (response.status === 200) {
          setQuantities(newQuantities);
        }
        
      } else {
        const response = await removeItemFromCart(userID, itemID);
        if (response.status === 200) {
          setQuantities(newQuantities);
        }
      }
    } else {
      try {
        const response = await removeItemCompletelyFromCart(userID, itemID);
        if (response.status === 200) {
          const updatedCartItems = cartItems.filter((item) => item.id !== itemID);
          setCartItems(updatedCartItems);
          setQuantities(updatedCartItems.map((item) => item.quantity || 1));
        }
        
      } catch (error) {
        console.error("Error removing item:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item, index) => acc + item.price * quantities[index],
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold w-fit mx-auto text-gray-900 mb-4">
        My Shopping Cart
      </h2>
      <Form method="post" className="bg-white rounded-lg shadow-md p-6">
        <React.Suspense fallback={<h2>Loading cart items...</h2>}>
          <Await resolve={cartItems}>
            <section aria-labelledby="cart-heading">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={item.id} className="py-4 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="flex-none w-24 h-24 rounded-lg border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-500">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center mb-4">
                          <span className="text-gray-600 mr-2">Quantity:</span>
                          <button
                            onClick={() =>
                              quantities[index] > 1
                                ? handleQuantityChange(
                                    index,
                                    quantities[index] - 1,
                                    item.id
                                  )
                                : handleQuantityChange(index, 0, item.id)
                            }
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-1 rounded-l hover:bg-gray-300"
                            type="button"
                          >
                            -
                          </button>
                          <span className="bg-gray-200 py-1 px-1">{quantities[index]}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, quantities[index] + 1, item.id)
                            }
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-1 rounded-r hover:bg-gray-300"
                            type="button"
                            disabled={quantities[index] >= products[index].stockAmount}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-gray-900 font-medium ml-4">
                          EGP {(item.price * quantities[index]).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Await>
        </React.Suspense>
        <section aria-labelledby="summary-heading" className="mt-8">
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order Summary
          </h2>
          <div className="bg-gray-100 p-4 mt-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                EGP {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">
                EGP {subtotal > 0 ? shipping.toFixed(2) : 0}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-medium text-gray-900">
                EGP {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-base font-medium text-gray-900">
                Order Total
              </span>
              <input type="hidden" value={total}/>
              <span className="text-base font-medium text-gray-900">
                EGP {subtotal > 0 ? total.toFixed(2) : 0}
              </span>
            </div>
          </div>
        </section>
        <div className="mt-8 flex justify-end">
          <button
            className="bg-[#2DA884] block text-white w-fit mx-auto my-2 text-sm font-bold p-4 rounded-md transition-colors duration-300 hover:bg-white hover:text-[#2DA884] border border-[#2DA884]"
            type="button"
          >
            Continue to Payment
          </button>
        </div>
      </Form>
    </div>
  );
}
