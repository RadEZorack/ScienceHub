// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} accept=".pyml" />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
