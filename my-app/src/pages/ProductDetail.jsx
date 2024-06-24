import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getProduct } from '../api';
import FontAwesome from 'react-fontawesome';
import { isLoggedIn } from '../utils';

import defaultImage from '../images/product-1.jpg';

export function loader({ params }) {
  const id = Number(params.id);
  const product = getProduct(id);
  return product;
}

export default function ProductDetail() {
  const product = useLoaderData();
  const parts = defaultImage.split('-');
  parts[parts.length - 1] = `${product.id}.jpg`;
  const imageUrl = parts.join('-');

  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  function handleCartClick() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    const response = isLoggedIn();
    console.log(response);
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    } else {
      // Check if the selected quantity exceeds the available stock
      if (quantity > product.stockAmount) {
        console.log('Not enough stock available.');
        return;
      }
      // Here, you can add the logic to add the product to the cart with the selected quantity
      console.log(`Added ${quantity} ${product.name}(s) to the cart.`);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:items-center">
        <div className="md:w-1/2 md:mr-8 mb-4 md:mb-0">
          <img className="rounded-lg" src={imageUrl} alt="Product" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4 font-normal leading-relaxed text-sm tracking-wide">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-2">Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  className={`text-yellow-500 text-lg mr-1 ${
                    index < Math.round(product.rating) ? 'fas fa-star' : 'far fa-star'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center mb-4">
            {product.saleAmount ? (
              <>
                <span className="text-gray-600 mr-2">Price:</span>
                <span className="text-gray-500 line-through">${product.price}</span>
                <span className="text-gray-600 font-semibold ml-2">${product.price - product.saleAmount}</span>
              </>
            ) : (
              <>
                <span className="text-gray-600 mr-2">Price:</span>
                <span className="text-gray-700">${product.price}</span>
              </>
            )}
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-2">Quantity:</span>
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="bg-gray-200 text-gray-700 font-bold py-1 px-2 rounded-l hover:bg-gray-300"
              type="button"
            >
              -
            </button>
            <span className="bg-gray-200 py-1 px-3">{quantity-1}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 text-gray-700 font-bold py-1 px-2 rounded-r hover:bg-gray-300"
              type="button"
              disabled={quantity >= product.stockAmount}
            >
              +
            </button>
          </div>
          <div className="text-gray-600 mb-4">
            <span className="mr-2">Stock:</span>
            <span className="text-gray-700">{product.stockAmount}</span>
          </div>
          <button
            onClick={() => handleCartClick()}
            className=" bg-customGreen text-white font-bold px-4 py-2 text-sm rounded-full transition duration-500 ease-in-out transform hover:bg-white hover:text-customGreen border border-black hover:scale-105"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
