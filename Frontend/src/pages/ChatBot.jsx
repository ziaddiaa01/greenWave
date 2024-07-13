import { useState } from "react";
import image from "../images/chat.jpg"

const ChatBot = () => {
  const API_KEY = "AIzaSyAVZpUTEA5VwqEgAvltHkz6b6jJwDmGQWA";
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "Assistant",
      content: "How can I help you?",
    },
  ]);

  const chatData = async (userMessage) => {
    try {
      setIsTyping(true);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Oops! Something went wrong while processing your request.");
      }

      const responseData = await response.json();
      setIsTyping(false);

      const assistantReply = responseData.candidates[0].content.parts[0].text; // Accessing the text from the response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.error("Error while fetching chat data:", error);
      setIsTyping(false);
    }
  };

  const handleSendMessage = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
    chatData(messageContent);
  };

  return (
  <div className="flex gap-2 bg-gradient-to-br from-emerald-400 to-green-400">
    <img src={image} className="="></img>
    <div className=" max-w-md mx-auto my-5  p-3 min-h-[400px] h-fit bg-[#333333] shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-customGreen items-center flex gap-3">{message.role} <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path fill="#63E6BE" d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg></h3>
            <p className="text-lg text-white">{message.content}</p>
          </div>
        ))}
        {isTyping && <p className="text-gray-500">Bot is typing...</p>}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.input.value;
          if (input.trim() !== "") {
            handleSendMessage(input);
            e.target.reset();
          }
        }}
        className="bg-gray-500 px-4 py-3 flex rounded-md items-center"
      >
        <input
          type="text"
          name="input"
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-1 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-customGreen rounded-l-md"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="py-2 px-4 bg-green-700 text-white rounded-r-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Send
        </button>
      </form>
    </div>
    </div>
  );
};

export default ChatBot;
