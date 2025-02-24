import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar"; // ✅ Import Correctly




function App() {
  return (
    <div className="container text-center">
      <h1 className="text-primary">Welcome to TaxEase</h1>
      <p className="lead">Securely upload your tax documents and get AI-powered insights.</p>
      <button className="btn btn-success">Get Started</button>
    </div>
  );
}


export default App;
