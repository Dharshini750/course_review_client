import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const response = await fetch(`${API_URL}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
      } else {
        throw new Error("Error in chatbot response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong. Please try again!" },
      ]);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-20 right-5 z-50"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="bg-white shadow-xl rounded-xl w-96 h-120 p-6 flex flex-col">
          <button
            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
            title="Close"
          >
            ✖
          </button>
          <div className="flex-grow overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded ${msg.type === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}
                style={{ color: "black" }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              className="flex-grow p-3 border rounded-l w-[40%]"
              style={{ color: "black" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-yellow-500 text-black px-6 py-3 rounded-r hover:bg-yellow-600"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-5 right-5 bg-yellow-600 text-black rounded-full w-16 h-16 text-3xl shadow-lg hover:bg-yellow-700"
        onClick={() => setIsOpen(!isOpen)}
        title="Chatbot"
      >
        💬
      </button>
    </>
  );
}
