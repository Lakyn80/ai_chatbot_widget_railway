import React, { useState } from 'react';

export default function ChatWindow({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { from: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
  };

  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="bg-pink-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
        <span>AI Chat</span>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.from === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-200 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-2 py-1 rounded-l"
          placeholder="Napiš zprávu..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-3 py-1 rounded-r"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
}
