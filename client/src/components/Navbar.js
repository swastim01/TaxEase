import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          💰 AI Tax Assistant
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/upload">Upload Document</Link>
          <Link className="nav-link" to="/chatbot">AI Chatbot</Link>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-secondary">
          {darkMode ? <Sun /> : <Moon />} {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
