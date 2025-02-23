import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>AI Tax Assistant</h1>
      <Link to="/upload">Upload Document</Link> | 
      <Link to="/chatbot">AI Chatbot</Link>
    </div>
  );
}

export default Dashboard;
