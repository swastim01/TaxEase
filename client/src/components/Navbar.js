import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container-fluid">
        <Link className={`navbar-brand ${darkMode ? "text-white" : "text-dark"}`} to="/">💰 TaxEase</Link>
        <div className="navbar-nav">
          <Link className={`nav-link ${darkMode ? "text-white" : "text-dark"}`} to="/upload">Upload Document</Link>
          <Link className={`nav-link ${darkMode ? "text-white" : "text-dark"}`} to="/chatbot">AI Chatbot</Link>
          <Link className={`nav-link ${darkMode ? "text-white" : "text-dark"}`} to="/tax-calculator">Tax Calculator</Link> {/* New Link */}
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-secondary">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="ms-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </nav>
  );
}
