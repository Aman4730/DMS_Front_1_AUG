import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Card, Divider } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./style.css";
export default function FileFolderProperties({
  propertiesModelClose,
  propertiesModel,
  list,
}) {
  const propertiesData = propertiesModel?.data;
  function convertTimestampToFormattedDate(timestamp) {
    const originalDate = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return originalDate.toLocaleString("en-US", options);
  }
  const originalTimestamp1 = propertiesData?.updatedAt; // Replace with your actual timestamp
  const formattedDate1 = convertTimestampToFormattedDate(originalTimestamp1);
  function formatFileSize(sizeInBytes) {
    if (sizeInBytes < 1024) {
      return sizeInBytes + " B";
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
  }
  const fileSizeInBytes =
    propertiesData?.file_size || propertiesData?.folder_size;
  const formattedSize = formatFileSize(fileSizeInBytes);
  return (
    <React.Fragment>
      <Dialog
        open={propertiesModel.status}
        onClose={propertiesModelClose}
        maxWidth="xs" // Set the maximum width (xs, sm, md, lg, xl)
        fullWidth
      >
        <DialogTitle>Properties</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DialogContentText className="alignRight">
              <span>Name:</span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "135px",
                }}
              >
                {propertiesData?.file_name || propertiesData?.folder_name}
              </span>
            </DialogContentText>
          </DialogContentText>
          <DialogContentText className="alignRight">
            <span>Type:</span>({propertiesData?.file_type || "Folder"})
          </DialogContentText>
          <DialogContentText className="alignRight">
            <span>Size:</span>
            {formattedSize} (
            {propertiesData?.file_size || propertiesData?.folder_size} bytes)
          </DialogContentText>
          <Divider sx={{ marginBottom: "1em" }} />
          <DialogContentText className="alignRight">
            <span>Version:</span>
            {propertiesData?.versionCount || "No Version"}
          </DialogContentText>
          <DialogContentText className="alignRight">
            <span>Storage:</span>
            <DialogContentText>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {list?.map((data, index) => (
                  <div key={index}>
                    {data?.folder_name ? <p>{data?.folder_name} /</p> : ""}
                  </div>
                ))}
              </div>
            </DialogContentText>
          </DialogContentText>
          <Divider sx={{ marginBottom: "1em" }} />
          <DialogContentText className="alignRight">
            <span>Created Date:</span>
            {formattedDate1}
          </DialogContentText>
          <DialogContentText className="alignRight">
            <span>Created By: </span>
            {propertiesData?.user_email}
          </DialogContentText>
          <Divider sx={{ marginBottom: "1em" }} />

          <DialogContentText className="alignRight">
            <span>Updated Date:</span>
            {formattedDate1}
          </DialogContentText>
          <DialogContentText className="alignRight">
            <span>Updated By:</span>
            {formattedDate1 || "No Email"}
          </DialogContentText>
          <Divider />
          <DialogContentText className="alignRight">
            <span>Permissions:</span>
            {formattedDate1 || "No Email"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={propertiesModelClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
