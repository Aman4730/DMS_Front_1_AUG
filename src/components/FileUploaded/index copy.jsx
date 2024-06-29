import React from "react";
import "./FileUploaded.css";

const FileUploaded = ({
  close,
  progress,
  inputRef,
  handleOkay,
  uploadStatus,
  onChooseFile,
  selectedFile,
  clearFileInput,
  handleFileChange,
}) => {
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {!selectedFile && (
        <button
          className="file-btn"
          onClick={onChooseFile}
          style={{ outline: "none" }}
        >
          <span className="material-symbols-outlined FileIcon">upload</span>
          Upload File
        </button>
      )}
      {selectedFile && (
        <div>
          <div className="file-card">
            <span className="material-symbols-outlined FileIcon">
              description
            </span>

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>
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

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
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
         
        </div>
      )}
    </div>
  );
};

export default FileUploaded;
