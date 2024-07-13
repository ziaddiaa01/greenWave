import { deleteBook , getBooks } from "../api";
import { useLoaderData } from 'react-router-dom';
import { useState } from "react";
export async function loader() {
    const books = await getBooks();
    return books ;
 }
function AllBooks() {
    const loaderData = useLoaderData();
    const [ books , setBooks ] = useState(loaderData)
    const [deleteMessage, setDeleteMessage] = useState(null);
  
    const handleDeleteProduct = async (bookId) => {
      try {
        const response = await deleteBook( { bookId });
        // Update products list after deletion
        const updatedBooks = books.filter(book => book._id !== bookId);
        setBooks(updatedBooks);
  
        // Display success message from response
        setDeleteMessage(response.message);
      } catch (error) {
        console.error('Error deleting book:', error);
        // Display error message if deletion fails
        setDeleteMessage('Failed to delete book.');
      }
    };
  
    return (
      <div className="container mx-auto w-fit py-8">
        <h2 className="text-2xl font-bold mb-4">Books</h2>
        {deleteMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            {deleteMessage}
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path fillRule="evenodd" d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        )}
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">publisher</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Language</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map(book => (
                <tr key={book._id}>
                  <td className="py-3 px-4">{book.name}</td>
                  <td className="py-3 px-4">{book.publisher}</td>
                  <td className="py-3 px-4">{book.price == 0 ? "Free" : book.price} </td>
                  <td className="py-3 px-4">{book.language}</td>

                  <td className="py-3 px-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                      onClick={() => handleDeleteProduct(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default AllBooks;
