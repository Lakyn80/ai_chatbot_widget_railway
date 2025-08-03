import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

// 🟣 Stylizace ve stylu "Náramková Móda"
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔘 Bublina pro otevření/zavření chatu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg bg-pink-500 hover:bg-pink-600 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h10" />
          )}
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
