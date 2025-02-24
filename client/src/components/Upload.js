import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, MessageCircle } from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData);
      setResponse(data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold mb-4">📂 Upload Your Documents</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Submit your tax documents to get automated calculations.
      </p>

      {/* Centered File Upload */}
      <div className="flex flex-col items-center justify-center">
        <label className="flex flex-col items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md cursor-pointer hover:bg-blue-500 transition-all">
          <UploadCloud size={24} />
          <span>{file ? file.name : "Choose File"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Centered Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-500 transition-all disabled:bg-gray-500"
          disabled={!file || loading}
        >
          🚀 {loading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      {/* Centered Extracted Text Display */}
      {response && (
        <div className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-3/4 max-w-xl text-center mx-auto">
          <h3 className="text-xl font-medium">📝 Extracted Text:</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{response.extractedText}</p>
        </div>
      )}

      {/* Centered Floating AI Chat Button */}
      <a
        href="/chatbot"
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-500 transition-all"
        style={{ zIndex: 1000 }}
      >
        <MessageCircle size={20} /> Start AI Chat
      </a>
    </div>
  );
}
