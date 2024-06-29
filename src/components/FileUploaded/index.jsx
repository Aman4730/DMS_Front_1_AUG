import React from "react";
import "./FileUploaded.css";

const FileUploaded = ({
  close,
  progress,
  inputRef,
  uploadStatus,
  onChooseFile,
  selectedFile,
  editFileId,
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
      {!selectedFile && !editFileId && (
        <button
          className="upload-btn"
          onClick={onChooseFile}
          style={{ outline: "none"}}
        >
          Browse
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
                <h6 className="filedesc">{selectedFile?.name}</h6>
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
