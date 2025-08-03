import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './ChatWidget';
import './index.css';

window.ChatbotWidget = {
  init: () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = ReactDOM.createRoot(el);
    root.render(<ChatWidget />);
  },
};
