import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import FileViewer from "react-file-viewer";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FileDisplayModal({
  openFile,
  handleCloseFile,
  dataUrl,
  fileType,
}) {
  return (
    <div>
      <Dialog
        open={openFile}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseFile}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"File Viewer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div
              style={{
                border: "1px solid black",
                height: "800px",
                width: "800px",
              }}
            >
              {dataUrl && (
                <FileViewer
                  fileType={fileType}
                  filePath={dataUrl}
                  onError={console.error}
                  style={{ height: "100%", width: "100%" }}
                />
              )}
            </div>
            <iframe src={dataUrl} height={1000} width={1000} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFile}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
