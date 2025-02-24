import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

function Chatbot({ darkMode }) {
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center vh-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <MessageCircle size={48} className="mb-3 text-primary" />
      <h2 className="fw-bold">AI Chatbot</h2>
      <p className="text-muted">🚀 Coming Soon! Stay tuned for AI-powered tax assistance.</p>
      <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
    </div>
  );
}

export default Chatbot;
