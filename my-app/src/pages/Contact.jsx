import { Form, useActionData, useNavigation } from "react-router-dom";
import { sendFeedback } from "../api";
import FontAwesome from "react-fontawesome";
import { useEffect , useState} from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  try {
    const response = await sendFeedback({name, email, subject, message});
    return { success: true, message: response }; // Return success response
  } catch (err) {
    return { success: false, message: err.message }; // Return error message
  }
}

export default function Contact() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    if (actionData) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [actionData]);

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

          <input
            name="subject"
            type="text"
            placeholder="Subject"
            required
            className="mb-4 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="4"
            className="mb-1 p-2 border outline-customGreen border-gray-300 rounded-md w-full"
          ></textarea>
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
          {actionData && actionData.message}
          </h3>
        )}
      </div>
      
    </div>
  );
}
