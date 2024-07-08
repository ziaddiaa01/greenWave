import React, { useState, useEffect } from "react";
import { useLoaderData, defer, Await, Link } from "react-router-dom";
import { getUserShoppingCart, addItemToCart, removeItemFromCart } from "../api";
import defaultImageCourse from "../images/course-6686fb554515995779e96b6d.jpg";
import defaultImageProduct from '../images/product-6689f8ae0221a8280371a5ab.jpg';
import defaultImageBook from "../images/book-668703d94515995779e96b74.jpg";



export async function loader() {
  const cart = await getUserShoppingCart();
  const cartItems = cart.cart;
  return defer({ cartItems });
}

export default function ShoppingCart() {
  const { cartItems: initialCartItems } = useLoaderData();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [quantities, setQuantities] = useState(
    initialCartItems.items.map((item) => item.quantity)
  );


  useEffect(() => {
    setQuantities(cartItems.items.map((item) => item.quantity));
  }, [cartItems]);

  const handleQuantityChange = async (index, newQuantity, itemId, itemType) => {
    const currentQuantity = quantities[index];

    try {
      let response;
      if (newQuantity > 0) {
        // Adding item to cart
        response = await addItemToCart({
          [`${itemType}Id`]: itemId,
          quantity: newQuantity - currentQuantity,
        });
      } else if (newQuantity === 0) {
        // Removing item from cart
        response = await removeItemFromCart({ [`${itemType}Id`]: itemId });
        // Remove item from cartItems state
        const updatedCartItems = {
          ...cartItems,
          items: cartItems.items.filter((item, idx) => idx !== index),
        };
        setCartItems(updatedCartItems);
        return; // Exit early to prevent updating quantities and subtotal
      }
      // Handle successful response
      if (
        response.message === "Item added to cart" ||
        response.message === "Item removed from cart"
      ) {
        const updatedCartItems = {
          ...cartItems,
          items: cartItems.items.map((item, idx) => ({
            ...item,
            quantity: idx === index ? newQuantity : item.quantity,
          })),
        };
        setCartItems(updatedCartItems);
      } else {
        console.error("Unexpected response from API:", response);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      // Handle error gracefully
    }
  };
  const getItemImageUrl = (item) => {
    if (item.productId) {
      const parts = defaultImageProduct.split("-");
      parts[parts.length - 1] = `${item.productId._id}.jpg`;
      return parts.join("-");
    } else if (item.bookId) {
      const parts = defaultImageBook.split("-");
      parts[parts.length - 1] = `${item.bookId._id}.jpg`;
      return parts.join("-");
    } else if (item.courseId) {
      const parts = defaultImageCourse.split("-");
      parts[parts.length - 1] = `${item.courseId._id}.jpg`;
      return parts.join("-");
    } else {
      // Default image if item type is unknown (though ideally should not happen)
      return defaultImageProduct; // Adjust default image as needed
    }
  };

  const subtotal = cartItems.items.reduce((acc, item, index) => {
    let itemPrice = 0;
  
    // Determine the price based on the item type
    if (item.productId) {
      itemPrice = item.productId.price || 0;
    } else if (item.bookId) {
      itemPrice = item.bookId.price || 0;
    } else if (item.courseId) {
      itemPrice = item.courseId.price || 0;
    }
  
    const itemQuantity = quantities[index] || 0;
    return acc + (itemPrice * itemQuantity);
  }, 0);
  
  const shipping = 5.0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold w-fit mx-auto text-gray-900 mb-4">
        My Shopping Cart
      </h2>
      <React.Suspense fallback={<h2>Loading cart items...</h2>}>
        <Await resolve={cartItems}>
          <section aria-labelledby="cart-heading">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.items.map((item, index) => (
                <li key={item._id} className="py-4 flex items-center space-x-4">
                  {item.productId && (
                    <img
                      src={getItemImageUrl(item)}
                      alt={item.productId.name}
                      className="flex-none w-24 h-24 rounded-lg border border-gray-200"
                    />
                  )}
                  {item.bookId && (
                    <img
                    src={getItemImageUrl(item)}
                      alt={item.bookId.name}
                      className="flex-none w-24 h-24 rounded-lg border border-gray-200"
                    />
                  )}
                  {item.courseId && (
                    <img
                    src={getItemImageUrl(item)}
                      alt={item.courseId.name}
                      className="flex-none w-24 h-24 rounded-lg border border-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.productId
                        ? item.productId.name
                        : item.bookId
                        ? item.bookId.name
                        : item.courseId.name}
                    </h3>
                    <p className="text-gray-500">
                      {item.productId
                        ? item.productId.description
                        : item.bookId
                        ? item.bookId.description
                        : item.courseId.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center mb-4">
                        <span className="text-gray-600 mr-2">Quantity:</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              quantities[index] - 1,
                              item.productId
                                ? item.productId._id
                                : item.bookId
                                ? item.bookId._id
                                : item.courseId._id,
                              item.productId
                                ? "product"
                                : item.bookId
                                ? "book"
                                : "course"
                            )
                          }
                          className="bg-gray-200 text-gray-700 font-bold py-1 px-1 rounded-l hover:bg-gray-300"
                          type="button"
                        >
                          -
                        </button>
                        <span className="bg-gray-200 py-1 px-1">
                          {quantities[index]}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              quantities[index] + 1,
                              item.productId
                                ? item.productId._id
                                : item.bookId
                                ? item.bookId._id
                                : item.courseId._id,
                              item.productId
                                ? "product"
                                : item.bookId
                                ? "book"
                                : "course"
                            )
                          }
                          className="bg-gray-200 text-gray-700 font-bold py-1 px-1 rounded-r hover:bg-gray-300"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-gray-900 font-medium ml-4">
                        EGP{" "}
                        {(item.productId
                          ? item.productId.price
                          : item.bookId
                          ? item.bookId.price
                          : item.courseId.price) }
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
            <input type="hidden" name="total" value={total} />
            <span className="text-base font-medium text-gray-900">
              EGP {subtotal > 0 ? total.toFixed(2) : 0}
            </span>
          </div>
        </div>
      </section>
      <div className="mt-8 flex justify-end">
        <Link
          to="/checkout"
          className="bg-[#2DA884] block text-white w-fit mx-auto my-2 text-sm font-bold p-4 rounded-md transition-colors duration-300 hover:bg-white hover:text-[#2DA884] border border-[#2DA884]"
        >
          Continue to Payment
        </Link>
      </div>
    </div>
  );
}
