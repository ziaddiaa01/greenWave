// ChatBot.js
import { useState } from "react";

export default function ChatBot() {
  const API_KEY = "sk-proj-GtlKjvV8ASSh6Dumm0jRT3BlbkFJZqMryk8xhXJ6O6gVvWVP";
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "How can I help you ?",
    },
  ]);

  const chatData = async (userMessage) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, { role: "user", content: userMessage }],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Oops! Something went wrong while processing your request."
        );
      }

      const responseData = await response.json();
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: responseData.choices[0].message.content,
        },
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
    setIsTyping(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-gray-600">{message.role}</h3>
            <p className="text-lg">{message.content}</p>
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
        className="bg-gray-100 px-4 py-3 flex items-center"
      >
        <input
          type="text"
          name="input"
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-1 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="py-2 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
