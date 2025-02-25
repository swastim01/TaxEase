import React, { useState , useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import TaxCalculator from "./components/TaxCalculator"; // Import from components
import ChatbotPage from "./components/Chatbot";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


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
