import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <div className="row">
          {/* Left - Navigation Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/upload" className="text-light text-decoration-none">Upload Docs</Link></li>
              <li><Link to="/tax-calculator" className="text-light text-decoration-none">Tax Calculator</Link></li>
              <li><Link to="/chatbot" className="text-light text-decoration-none">AI Chatbot</Link></li>
            </ul>
          </div>

          {/* Center - Branding */}
          <div className="col-md-4">
            <h5 className="fw-bold">💰 TaxEase</h5>
            <p className="text-muted-white">Making tax filing easier and smarter.</p>
          </div>

          {/* Right - Social Media Icons */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://linkedin.com/in/swasti-mishra" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaLinkedin />
              </a>
              <a href="https://github.com/swastimishra" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaGithub />
              </a>
              <a href="https://twitter.com/swasti" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaTwitter />
              </a>
              <a href="https://facebook.com/swasti" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 border-top pt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} TaxEase. All Rights Reserved.</p>
          <p className="text">Designed & Developed by <strong>Swasti Mishra</strong></p>
        </div>
      </div>
    </footer>
  );
}
