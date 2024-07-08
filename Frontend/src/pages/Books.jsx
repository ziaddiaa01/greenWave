import React from "react";
import { Link, useLoaderData, Await, defer } from "react-router-dom";
import defaultImage from "../images/book-668703d94515995779e96b74.jpg";
import { getBooks , addItemToCart } from "../api";
import { isLoggedIn } from "../utils";

export async function loader() {
  return defer({ books: await getBooks() });
}

async function handleCartClick(bookId) {
  const request = new Request(window.location.href);
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn()) {
    window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
  } else {
    try {
      const response = await addItemToCart({ bookId: bookId, quantity: 1 });
      console.log(response.message);
      alert(response.message);
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      alert(error.message);
    }
  }
}

function Books() {
  const dataPromise = useLoaderData();

  function renderBooks(books) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => {
          const parts = defaultImage.split("-");
          parts[parts.length - 1] = `${book._id}.jpg`;
          const imageUrl = parts.join("-");

          return (
            <div
              key={book._id}
              className="shadow-lg border border-gray-200 rounded-lg py-3 px-3 transition duration-200 ease-in-out transform hover:shadow-black hover:scale-105"
            >
              <Link to={`${book._id}`}>
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={book.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-sm duration-300 ease-in-out bg-black bg-opacity-50">
                    <p className="text-white font-bold text-lg opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                      View Book
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2">{book.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.publisher}</p>
                  <h3 className="text-sm font-semibold mb-2 ">{book.price > 0 ? `${book.price} EGP`:"Free"}</h3>
                  
                </div>
              </Link>
              {book.price === 0 ? (
                    <div className="bg-customOrange rounded-3xl w-full text-sm  text-center hover:scale-105 text-white  py-2  duration-300 ease-in-out">
                         <Link to={book.download_link} >
                            Download
                        </Link>
                    </div>
                   
                  ) : (
                    <button
                      onClick={() => handleCartClick(book._id)}
                      className="bg-customOrange rounded-3xl w-full text-sm  hover:scale-105 text-white  py-2  duration-300 ease-in-out "
                    >
                      Add to Cart
                    </button>
                  )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <main className="home-page-container">
      <h3 className=" font-semibold">Books</h3>
      <React.Suspense fallback={<h2>Loading books...</h2>}>
        <Await resolve={dataPromise.books}>{renderBooks}</Await>
      </React.Suspense>
    </main>
  );
}

export default Books;
