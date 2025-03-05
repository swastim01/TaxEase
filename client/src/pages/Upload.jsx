import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, MessageCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    setLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      setResponse(data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
      <h2 className="display-5 fw-bold mb-3 text-primary">📂 Upload Your Documents</h2>
      <p className="text-secondary">Submit your tax documents and get instant AI-driven insights.</p>

      {/* File Upload */}
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

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="btn btn-success w-100"
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

      {/* Extracted Text Display */}
      {response && (
        <div className="card mt-4 p-3 shadow" style={{ maxWidth: "600px", width: "100%" }}>
          <h4 className="text-dark">📝 Extracted Text:</h4>
          <p className="text-muted mt-2">{response.extractedText}</p>
        </div>
      )}

      {/* Floating AI Chat Button */}
      <a
        href="/chatbot"
        className="position-fixed bottom-0 start-50 translate-middle-x btn btn-lg btn-warning shadow-lg d-flex align-items-center gap-2"
        style={{ marginBottom: "20px" }}
      >
        <MessageCircle size={20} /> Start AI Chat
      </a>
    </div>
  );
}
