import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        uploadFile(selectedFile);
      } else {
        alert("Please select a valid PDF file.");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        uploadFile(droppedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      document.getElementById("loader").classList.remove("hidden");

      const response = await axios.post("http://localhost:8888/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      document.getElementById("loader").classList.add("hidden");

      onUploadComplete(Object.values(response.data.flashcards));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };

  return (
    <div
      id="uploadHolder"
      className={`dropzone ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form>
        <label className="buttons" htmlFor="fileUpload">Choose a PDF</label>
        <input
          id="fileUpload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </form>
      {file ? <p>Selected File: {file.name}</p> : <p>Drag and drop a PDF or click to upload</p>}
      <div id="loader" className="loader hidden"></div>
    </div>
  );
};

export default FileUpload;