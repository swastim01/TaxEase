import React, { useState , useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import "./App.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="center-content">
      <h1>Welcome to TaxEase</h1>
      <p>Your smart tax helper, simplifying tax calculations with AI.</p>
      <button className="btn btn-primary btn-lg" onClick={() => navigate("/upload")}>
        Get Started 🚀
      </button>
    </div>
  );
};

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      alert(`Uploading: ${file.name}`);
      // You can now send the file to your backend
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="center-content">
      <h2>Upload Your Documents</h2>
      <p>Submit your tax documents to get automated calculations.</p>

      {/* Styled Upload Input */}
      <label className="custom-file-upload">
        <input type="file" onChange={handleFileChange} />
        📂 Choose File
      </label>

      {/* Show file name if selected */}
      {file && <p className="file-name">Selected: {file.name}</p>}

      {/* Upload Button */}
      <button className="btn btn-success btn-lg mt-3" onClick={handleUpload}>
        🚀 Upload Document
      </button>

      {/* AI Chat Popup */}
      <a href="/chatbot" className="chat-popup">💬 Start AI Chat</a>
    </div>
  );
};



const ChatbotPage = () => (
  <div className="center-content">
    <h2>Coming Soon 🚀</h2>
    <p>Our AI chatbot is in development. Stay tuned!</p>
  </div>
);

const TaxCalculator = () => {
  const [netIncome, setNetIncome] = useState("");

  return (
    <div className="container mt-5">
      <h2 className="text-center">Tax Calculator</h2>
      <p className="text-muted text-center">As amended up to Finance (No.2) Act 2024</p>
      
      <form>
        {/* Assessment Year */}
        <div className="mb-3">
          <label className="form-label">Assessment Year</label>
          <select className="form-select">
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        {/* Tax Payer Type */}
        <div className="mb-3">
          <label className="form-label">Tax Payer</label>
          <select className="form-select">
            <option>Individual</option>
            <option>HUF</option>
            <option>AOPs/BOI</option>
            <option>Domestic Company</option>
            <option>Foreign</option>
          </select>
        </div>

        {/* Age Category */}
        <div className="mb-3">
          <label className="form-label">Category (Age)</label>
          <select className="form-select">
            <option>Less than 60 years</option>
            <option>Equal to 60 years or more but less than 80 years</option>
            <option>Equal to 80 years or more</option>
          </select>
        </div>

        {/* Residential Status */}
        <div className="mb-3">
          <label className="form-label">Residential Status</label>
          <select className="form-select">
            <option>Resident</option>
            <option>Not Resident</option>
          </select>
        </div>

        {/* Net Taxable Income */}
        <div className="mb-3">
          <label className="form-label">Net Taxable Income</label>
          <input 
            type="number" 
            className="form-control" 
            value={netIncome} 
            onChange={(e) => setNetIncome(e.target.value)}
          />
        </div>

        {/* Tax Calculation Outputs */}
        <div className="mb-3">
          <label className="form-label">Income Tax after relief u/s 87A</label>
          <input type="text" className="form-control bg-light" disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Surcharge</label>
          <input type="text" className="form-control bg-light" disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Education Cess</label>
          <input type="text" className="form-control bg-light" disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Secondary and Higher Education Cess</label>
          <input type="text" className="form-control bg-light" disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Tax Liability</label>
          <input type="text" className="form-control bg-light" disabled />
        </div>
        
        {/* Reset Button */}
        <button type="reset" className="btn btn-danger">Reset</button>
      </form>
      
      <p className="text-muted mt-4">
        <strong>Disclaimer:</strong> The above calculator provides a basic estimate of tax liability. Users are advised to refer to official tax provisions before filing returns.
      </p>
    </div>
  );
};


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
      <div className="app-container"> {/* Wrap all content in a container */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} /> {/* Tax Calculator Route */}
        </Routes>
      </div>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}

export default App;
