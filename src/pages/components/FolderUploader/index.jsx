import React, { useState } from "react";
import axios from "axios"; // Import Axios library

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/uploadfolder`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Error uploading files: ", error);
      setUploadStatus("Error uploading files. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="file"
        webkitdirectory="true"
        multiple
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload Files</button>
      <div>
        <h2>Selected Files:</h2>
        <ul>
          {selectedFiles.length > 0 &&
            Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
        </ul>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Index;
