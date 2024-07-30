import React from "react";
import "./FileUploaded.css";

const FileUploaded = ({
  progress,
  inputRef,
  uploadStatus,
  clearFileInput,
  handleFileChange,
  multiplefilesArray,
}) => {
  return (
    <div>
      <div className="kb-file-upload">
        <div className="file-upload-box">
          <input
            type="file"
            ref={inputRef}
            id="fileupload"
            className="file-upload-input"
            onChange={handleFileChange}
            multiple
          />
          <span>
            Drag and drop or{" "}
            <span className="file-link">Choose your files</span>
          </span>
        </div>
      </div>
      {multiplefilesArray?.map((file, index) => (
        <div className="file-card">
          <span className="material-symbols-outlined FileIcon">
            description
          </span>
          <div className="file-info">
            <div style={{ flex: 1 }}>
              <h6 className="filedesc">{file.name}</h6>
              <div className="progress-bg">
                <div
                  className="progress"
                  style={{
                    width: `${progress}%`,
                    background: "#5d4dcc",
                    height: "5px",
                  }}
                />
              </div>
            </div>
            {uploadStatus === "selected" ? (
              <button onClick={() => clearFileInput(file.lastModified)}>
                <span className="material-symbols-outlined close-icon">
                  close
                </span>
              </button>
            ) : (
              <div className="check-circle">
                {uploadStatus === "uploading" ? (
                  `${progress}%`
                ) : uploadStatus === "done" ? (
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    check
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploaded;
