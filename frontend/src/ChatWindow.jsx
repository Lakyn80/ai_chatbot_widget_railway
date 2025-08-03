import React, { useState } from "react";

// 🟣 Stylizované chat okno ve stylu „Náramková Móda“
export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Ahoj! Potřebuješ poradit s výběrem náramku? 💖" },
  ]);
  const [input, setInput] = useState("");

  // 🟢 Odeslání zprávy na backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Nastala chyba při komunikaci s chatbotem." },
      ]);
    }
  };

  // 🟦 Odeslání po stisku Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* ❌ Zavírací tlačítko */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-pink-500 hover:text-pink-700 text-xl font-bold rounded-full px-3 py-1 transition duration-200 z-10"
        aria-label="Zavřít"
      >
        ×
      </button>

      {/* 🟣 Hlavička */}
      <div className="bg-pink-500 text-white text-center py-3 font-semibold shadow">
        🎀 Náramková Móda Asistent
      </div>

      {/* 💬 Zprávy */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-pink-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[75%] whitespace-pre-line ${
              msg.role === "user"
                ? "bg-pink-200 self-end text-right"
                : "bg-white border border-pink-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* ✏️ Vstupní pole */}
      <div className="flex items-center border-t border-pink-200 bg-white px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napiš zprávu..."
          className="flex-1 px-3 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
}
