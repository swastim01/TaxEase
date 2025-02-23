import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData);
      setResponse(data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div>
      <h2>Upload Your Tax Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {response && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{response.extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;
