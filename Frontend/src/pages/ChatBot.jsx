import { useState } from "react";

const ChatBot = () => {
  const API_KEY = "AIzaSyAVZpUTEA5VwqEgAvltHkz6b6jJwDmGQWA";
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
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
    <div className="max-w-md mx-auto my-5 border border-5 p-3 h-fit bg-[#333333] shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-customGreen">{message.role}</h3>
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
  );
};

export default ChatBot;
