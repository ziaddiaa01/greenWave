import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getBook } from "../api";
import { isLoggedIn } from "../utils";

import defaultImage from "../images/book-1.jpg";

export function loader({ params }) {
  const id = Number(params.id);
  const book = getBook(id);
  return book;
}

export default function BookDetail() {
  const book = useLoaderData();
  const parts = defaultImage.split("-");
  parts[parts.length - 1] = `${book.id}.jpg`;
  const imageUrl = parts.join("-");

  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  function handleCartClick() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    const response = isLoggedIn();
    console.log(response);
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:items-center">
        <div className="md:w-1/2 md:mr-8 mb-4 md:mb-0">
          <img className="rounded-lg" src={imageUrl} alt="Product" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{book.name}</h2>
          <p className="text-gray-700 mb-4 font-normal leading-relaxed text-sm tracking-wide">
            {book.description}
          </p>

          {book.price === 0 ? (
            ""
          ) : (
            <>
              {" "}
              <div className="text-gray-600 mb-4">
                <span className="mr-2">Stock:</span>
                <span className="text-gray-700">{book.stockAmount}</span>
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
                <span className="bg-gray-200 py-1 px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 text-gray-700 font-bold py-1 px-2 rounded-r hover:bg-gray-300"
                  type="button"
                  disabled={quantity >= book.stockAmount}
                >
                  +
                </button>
              </div>
            </>
          )}
          <div className="text-gray-600 mb-4">
            <span className="mr-2">Publisher:</span>
            <span className="text-gray-700">{book.publisher}</span>
          </div>
          <div className="text-gray-600 mb-4">
            <span className="mr-2">Publication date:</span>
            <span className="text-gray-700">{book.publication_date}</span>
          </div>
          <div className="text-gray-600 mb-4">
            <span className="mr-2">Pages:</span>
            <span className="text-gray-700">{book.pages}</span>
          </div>

          {book.price === 0 ? (
            <div className="bg-customOrange rounded-3xl w-full text-sm  text-center hover:scale-105 text-white  py-2  duration-300 ease-in-out">
              <Link to={book.download_link}>Download</Link>
            </div>
          ) : (
            <button
              onClick={() => handleCartClick()}
              className="bg-customOrange rounded-3xl w-full text-sm  hover:scale-105 text-white  py-2  duration-300 ease-in-out "
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
