import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "../Component";
import { DialogContentText } from "@mui/material";
import "./FolderUploaded.css";
export default function FolderUpload({
  folderName,
  totalFiles,
  currentFile,
  folderUpload,
  openUploadFolder,
  updateImageDisplay,
  progressFolderUpload,
  handleCloseUploadFolder,
}) {
  const fileInputRef = React.useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openUploadFolder}
        onClose={handleCloseUploadFolder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Folder Upload"}
          <a
            onClick={handleCloseUploadFolder}
            className="close"
            style={{ cursor: "pointer" }}
          >
            <Icon name="cross-sm"></Icon>
          </a>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <input
                type="file"
                webkitdirectory="true"
                onChange={updateImageDisplay}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <div>
                <div className="file-card-folder">
                  <span className="material-symbols-outlined FileIcon">
                    description
                  </span>
                  <div className="file-info-folder">
                    <div style={{ flex: 1 }}>
                      <h6 className="filedesc-folder">
                        {currentFile
                          ? `${folderName}, Files : ${totalFiles}`
                          : "Select Folder"}
                      </h6>

                      <div className="progress-bg-folder">
                        <div
                          className="progress-folder"
                          style={{
                            width: `${progressFolderUpload}%`,
                            background: "#5d4dcc",
                            height: "5px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="check-circle">
                      {`${Math.floor(progressFolderUpload)}%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!currentFile ? (
            <button
              className="upload-btn"
              style={{ outline: "none" }}
              onClick={handleBrowseClick}
            >
              Browse
            </button>
          ) : (
            <button
              className="upload-btn"
              style={{ outline: "none" }}
              onClick={folderUpload}
            >
              Upload
            </button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
