import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} transition-all`}>
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">💰</span> AI Tax Assistant
        </h1>
        <div className="flex gap-4">
          <a href="/upload" className="text-blue-500 hover:underline">
            Upload Document
          </a>
          <a href="/chatbot" className="text-blue-500 hover:underline">
            AI Chatbot
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
