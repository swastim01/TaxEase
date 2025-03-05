import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow`}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">💰 TaxEase</Link>

        {/* Navbar Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">Upload Document</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tax-calculator">Tax Calculator</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatbot">AI Chatbot</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/track-expenses">Track Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forum">Forum</Link>
            </li>
          </ul>

          {/* Right-Side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Dark Mode Toggle */}
            <div style={{ width: "40px", height: "40px" }}></div>


            {/* Login / Logout Dropdown */}
            {isLoggedIn ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                  Profile
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/profile">My Account</Link></li>
                  <li><button className="dropdown-item" onClick={() => setIsLoggedIn(false)}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link className="btn btn-primary" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
