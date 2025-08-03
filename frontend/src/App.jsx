import { useState } from 'react';
import './index.css'; // 🟢 ujisti se, že máš @tailwind v index.css

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-100 flex flex-col items-center justify-center text-center p-6">
      <div className="flex space-x-4 mb-4">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="w-16 hover:scale-110 transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="/src/assets/react.svg" className="w-16 hover:scale-110 transition" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-pink-600 mb-4">✅ Tailwind funguje!</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          count is {count}
        </button>
        <p>
          Edituj <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> a ulož pro test HMR
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Klikni na loga Vite a React pro víc informací.
      </p>
    </div>
  );
}

export default App;
