import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(true)}
        className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition"
      >
        💬
      </button>
    </div>
  );
}
