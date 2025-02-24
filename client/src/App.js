import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar"; // 🟢 Import Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* 🟢 Add Navbar Here */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
