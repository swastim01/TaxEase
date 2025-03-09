import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Home } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <Clock size={64} className="text-warning mb-4" />
      <h1 className="text-primary fw-bold">🚀 Coming Soon</h1>
      <p className="text-muted fs-5">
        We are working hard to integrate with the official government tax filing system.
      </p>
      <p className="text-muted">
        Stay tuned for updates! In the meantime, you can manually file your taxes on the{" "}
        <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer">
          Income Tax India Portal
        </a>.
      </p>
      <button className="btn btn-primary d-flex align-items-center gap-2 mt-3" onClick={() => navigate("/")}>
        <Home /> Back to Home
      </button>
    </div>
  );
}
