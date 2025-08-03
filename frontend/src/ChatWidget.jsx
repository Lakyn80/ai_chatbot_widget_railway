// 📁 frontend/src/widget/ChatWidget.jsx
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

// 🟣 Stylizace widgetu ve stylu „Náramková Móda“
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔘 Bublina pro otevření/zavření chatu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg bg-pink-500 hover:bg-pink-600 transition-all duration-300 transform ${
          isOpen ? "rotate-45 scale-90" : "scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Tři čárky jako bublina */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10" />
        </svg>
      </button>

      {/* 💬 Okno chatu */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[460px] bg-white border border-pink-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <ChatWindow />
        </div>
      )}
    </>
  );
}
