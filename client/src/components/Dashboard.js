import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light dark-mode">
      <h1 className="fw-bold text-center mb-3">Welcome to TaxEase</h1>
      <p className="text-muted text-center mb-4">
        Choose an option below to get started:
      </p>
      <div className="d-flex gap-3">
        <Link to="/upload" className="btn btn-primary px-4 py-2">
          📤 Upload Document
        </Link>
        <Link to="/chatbot" className="btn btn-secondary px-4 py-2">
          🤖 AI Chatbot
        </Link>
      </div>
    </div>
  );
}
