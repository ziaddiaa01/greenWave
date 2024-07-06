import { useLoaderData, Link } from "react-router-dom";
import { getBook , addItemToCart} from "../api";
import { isLoggedIn } from "../utils";


export async function loader({ params }) {
  const { id } = params; // Ensure 'id' matches the route parameter name
  try {
    const book = await getBook({ id });
    return book;
  } catch (error) {
    console.error('Error loading book:', error);
    throw error;
  }
}

export default function BookDetail() {
  const book = useLoaderData();

  async function handleCartClick() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    const response = isLoggedIn();
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    }
    else{
      try {
        const response = await addItemToCart({ bookId: book._id, quantity: 1 });
        console.log(response.message);
        alert(response.message);
      } catch (error) {
        console.error('Error adding item to cart:', error.message);
        alert(error.message);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:items-center">
        <div className="md:w-1/2 md:mr-8 mb-4 md:mb-0">
          <img className="rounded-lg"  alt="Product" />
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
