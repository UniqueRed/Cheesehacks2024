import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("pdf", file);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      document.getElementById("loader").classList.remove("hidden");
      const response = await axios.post("http://localhost:8888/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      document.getElementById("loader").classList.add("hidden");
      
      onUploadComplete(Object.values(response.data.flashcards));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div id="uploadHolder">
        <form>
          <label id="buttons" htmlFor="fileUpload">Choose a PDF</label>
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </form>
        <button id="buttons" type="submit" onClick={handleSubmit}>Upload PDF</button>
        <div id="loader" className="loader hidden"></div>
      </div>
    </>
  );
};

export default FileUpload;