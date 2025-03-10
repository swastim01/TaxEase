import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadCloud, MessageCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  // State to determine if the footer is in view
  const [isAboveFooter, setIsAboveFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the selector if your footer uses a different tag or class
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        // If the top of the footer is within the viewport height,
        // we assume it’s time to move the button up
        setIsAboveFooter(footerTop <= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      // Show preview only for images
      if (uploadedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(uploadedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("⚠️ Please select a file first.");

    setLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      if (data.extractedData) {
        navigate("/invoice-details", { state: { extractedData: data.extractedData } });
      } else {
        alert("⚠️ No tax details found. Ensure your invoice has clear tax data.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      if (error.response) {
        alert(`Server Error: ${error.response.data.message || "Something went wrong."}`);
      } else if (error.request) {
        alert("⚠️ No response from server. Check your internet connection.");
      } else {
        alert("⚠️ Upload failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
      <h2 className="display-5 fw-bold mb-3 text-primary">📂 Upload Your Documents</h2>
      <p className="text-secondary">Submit your tax documents and get instant AI-driven insights.</p>

      {/* File Upload Card */}
      <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="mb-3">
          <label className="btn btn-primary w-100">
            <UploadCloud size={20} className="me-2" />
            {file ? file.name : "Choose File"}
            <input type="file" className="d-none" onChange={handleFileChange} />
          </label>
        </div>

        {/* File Preview */}
        {preview && (
          <div className="mb-3">
            <img src={preview} alt="Preview" className="img-fluid rounded shadow" />
          </div>
        )}

        {/* File Info */}
        {file && (
          <div className="text-muted mt-2">
            <small>
              📁 {file.name} | {file.type} | {(file.size / 1024).toFixed(2)} KB
            </small>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="btn btn-success w-100 mt-2"
          disabled={!file || loading}
        >
          🚀 {loading ? "Uploading..." : "Upload Document"}
        </button>

        {/* Upload Progress */}
        {loading && (
          <div className="progress mt-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Chat Button */}
      <a
        href="/chatbot"
        className="btn btn-lg btn-warning shadow-lg d-flex align-items-center gap-2"
        style={{
          position: "fixed",
          bottom: isAboveFooter ? "80px" : "20px", // Adjusts position if footer is in view
          right: "20px",
          zIndex: 1050,
          padding: "10px 20px",
          transition: "bottom 0.3s ease-in-out"
        }}
      >
        <MessageCircle size={20} /> Start AI Chat?
      </a>
    </div>
  );
}
