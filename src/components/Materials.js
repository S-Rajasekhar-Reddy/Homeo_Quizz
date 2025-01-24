import React, { useState } from 'react';
import './Materials.css';

const Materials = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile); // Store the selected file
  };

  // Add the file to the materials list
  const handleAddFile = () => {
    if (file) {
      setFiles([...files, { name: file.name, id: Date.now() }]); // Add file with a unique id
      setFile(null); // Reset file state after adding
    }
  };

  // Remove the file from the materials list
  const handleRemoveFile = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId)); // Remove file by id
  };

  return (
    <div className="materials">
      <div className="upload-section">
        {/* Input for selecting files */}
        <input type="file" onChange={handleFileUpload} />
        {/* Button to add the selected file to the list */}
        <button onClick={handleAddFile} disabled={!file} className="add-btn">
          <span className="btn-text">Add Material</span>
        </button>
      </div>

      {/* Display uploaded materials */}
      <ul className="material-list">
        {files.map((file) => (
          <li key={file.id}>
            <span>{file.name}</span>
            {/* Button to remove the material from the list */}
            <button onClick={() => handleRemoveFile(file.id)} className="remove-btn">
              <span className="btn-text">Remove</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Materials;
