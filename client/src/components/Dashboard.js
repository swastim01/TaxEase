import React from "react";
import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to AI Tax Assistant</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Choose an option below:</p>
      <div className="flex gap-4">
        <a
          href="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all"
        >
          Upload Document
        </a>
        <a
          href="/chatbot"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-500 transition-all"
        >
          AI Chatbot
        </a>
      </div>
    </div>
  );
}
