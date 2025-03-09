import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaxCalculator from "./pages/TaxCalculator";
import ChatbotPage from "./pages/Chatbot";
import LandingPage from "./pages/LandingPage"; // Fixed import
import Upload from "./pages/Upload";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp"
import TrackExpenses from "./pages/TrackExpenses"
import ForumPage from "./pages/Forum"
import InvoiceDetails from "./pages/InvoiceDetails";
import ComingSoon from "./pages/ComingSoon"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Persist theme
  });

  // Apply dark mode class to <body> when toggled
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode); // Save preference
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Replaced Home with LandingPage */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/track-expenses" element={<TrackExpenses />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/invoice-details" element={<InvoiceDetails />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
