import { Form, useActionData, useNavigation } from "react-router-dom";
import { getBooks, getArticles, getCourses, getProducts, addReview } from "../api";
import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";

export async function action({ request }) {
  const formData = await request.formData();

  const itemId = formData.get("itemId");
  const comment = formData.get("comment");
  const itemType = formData.get("itemType");
  
  try {
    let response;
    if (itemType === "books") {
      const bookId = itemId;
      response = await addReview({ bookId, comment });
    } else if (itemType === "articles") {
      const articleId = itemId;
      response = await addReview({ articleId, comment });
    } else if (itemType === "courses") {
      const courseId = itemId;
      response = await addReview({ courseId, comment });
    } else if (itemType === "products") {
      const productId = itemId;
      response = await addReview({ productId, comment });
    }
    return { success: true, message: response.message }; // Extract and return only the message
  } catch (err) {
    return { success: false, message: err.message }; // Return error message
  }
}

export default function Contact() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState("articles");

  useEffect(() => {
    if (actionData) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  useEffect(() => {
    async function fetchData() {
      let data;
      switch (itemType) {
        case "books":
          data = await getBooks();
          break;
        case "articles":
          data = await getArticles();
          break;
        case "courses":
          data = await getCourses();
          break;
        case "products":
          const response = await getProducts();
          data = response.products;
          break;
        default:
          data = [];
      }
      setItems(data);
    }
    fetchData();
  }, [itemType]);

  let messageStyle = {};
  if (actionData && actionData.success) {
    messageStyle = { color: "#00b207", opacity: showMessage ? 1 : 0, transition: "opacity 0.5s ease-in-out" };
  } else {
    messageStyle = { color: "red", opacity: showMessage ? 1 : 0, transition: "opacity 0.5s ease-in-out" };
  }

  return (
    <div className="mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-3/4">
      {/* Company Info Container */}
      <div className="px-7 py-7 flex flex-col justify-between items-center text-center rounded-lg shadow-lg bg-white md:col-span-1">
        <p className="text-xs flex flex-col gap-2 pb-5 mb-3 text-gray-600">
          <FontAwesome name="fa-solid fa-location-arrow" className="text-4xl text-customGreen" /> 123 Main Street, City, Country
        </p>
        <p className="text-xs flex flex-col gap-2 pb-5 mb-3 text-gray-600">
          <FontAwesome name="fa-solid fa-envelope" className="text-4xl text-customGreen" /> greenwave@gmail.com
        </p>
        <p className="text-xs flex flex-col gap-2 pb-5 mb-3 text-gray-600">
          <FontAwesome name="fa-solid fa-phone" className="text-customGreen text-4xl" /> 123-456-7890
        </p>
      </div>
      {/* Contact Form Container */}
      <div className="text-left md:col-span-2 flex flex-col  rounded-lg shadow-lg bg-white px-3 py-7">
        <h3 className="w-full text-2xl font-bold mb-2">Just Say Hello!</h3>
        <p className="w-full text-left pr-10 text-xs text-gray-600 mb-3">
          We value your thoughts and insights! Your feedback helps us improve and serve you better. Don't hesitate to share your thoughts, suggestions, or any concerns with us. Together, we can make a difference and create a better experience for everyone. Your voice matters – let it be heard! Send us your feedback today.
        </p>

        <Form method="post" className="w-full " replace>
          <div className="flex gap-2">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="mb-4 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email Address"
              required
              className="mb-4 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
            />
          </div>

          <select
            name="itemType"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="mb-4 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
          >
            <option value="" selected disabled>select type</option>
            <option value="articles">Articles</option>
            <option value="books">Books</option>
            <option value="courses">Courses</option>
            <option value="products">Products</option>
          </select>

          <ul className="mb-4">
            {items.map((item) => (
              <li key={item._id} onClick={() => setSelectedItem(item)} className={`cursor-pointer p-2 rounded-md ${selectedItem?._id === item._id ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>
                {item.title || item.name}
              </li>
            ))}
          </ul>

          {selectedItem && (
            <>
              <input type="hidden" name="itemId" value={selectedItem._id} />
              <textarea
                name="comment"
                placeholder="Your Review"
                required
                rows="4"
                className="mb-1 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
              ></textarea>
            </>
          )}

          <button
            disabled={navigation.state === "submitting"}
            className="bg-customGreen text-white font-bold px-4 py-2 text-sm rounded-full transition border duration-500 ease-in-out transform hover:bg-white hover:text-customGreen hover:border hover:customGreen"
          >
            {navigation.state === "submitting"
              ? "Sending your message..."
              : "Send Message"}
          </button>
        </Form>

        {showMessage && actionData && (
          <h3 className="mb-4 text-lg" style={messageStyle}>
            {actionData.message} {/* Display only the message */}
          </h3>
        )}
      </div>
    </div>
  );
}
