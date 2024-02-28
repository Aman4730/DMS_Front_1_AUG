import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Tooltip } from "@mui/material";
export default function FileVersion({
  openVersion,
  onFileDownload,
  versionTableData,
  handleVersionClose,
  handleOpenDeleteFile,
}) {
  const allVersionData = versionTableData?.data?.all_version_file;
  function getFileIconByExtension(filename) {
    switch (filename) {
      case ("doc", "docx"):
        return "/Image/docx.svg";
      case "png":
        return "/Image/jpeg.svg";
      case "pdf":
        return "/Image/pdf.svg";
      case "ppt":
        return "/Image/pptx.svg";
      case "txt":
        return "/Image/txt.svg";
      case "video":
        return "/Image/video.png";
      case "xlsx":
        return "/Image/xlsx.svg";
      case "csv":
        return "/Image/csv.svg";
      case "zip":
        return "/Image/zip.svg";
      default:
        return "/Image/default.svg";
    }
  }
  const history = useHistory();
  const navigate = (id, data, filemongo_id) => {
    history.push("/fileviewer", {
      id: id,
      file: data,
      filemongo_id: filemongo_id,
    });
  };
  return (
    <React.Fragment>
      <Dialog
        open={openVersion}
        onClose={handleVersionClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#FFFFCC" }}>
                <TableCell>File Version</TableCell>
                <TableCell>File Size</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVersionData?.map((data) => {
                const originalTimestamp = data.updatedAt;
                const originalDate = new Date(originalTimestamp);
                const options = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                };
                const convertedTimestamp = originalDate.toLocaleString(
                  "en-US",
                  options
                );

                function formatFileSize(sizeInBytes) {
                  if (sizeInBytes < 1024) {
                    return sizeInBytes + " B";
                  } else if (sizeInBytes < 1024 * 1024) {
                    return (sizeInBytes / 1024).toFixed(2) + " KB";
                  } else if (sizeInBytes < 1024 * 1024 * 1024) {
                    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
                  } else {
                    return (
                      (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                    );
                  }
                }
                const fileSizeInBytes = data?.file_size || data?.folder_size;
                const formattedSize = formatFileSize(fileSizeInBytes);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={data.id}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      onClick={() => callApi(data)}
                      className="tablefont"
                      style={{
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                      }}
                    >
                      <img
                        src={
                          data?.file_name
                            ? getFileIconByExtension(data.file_type)
                            : data?.folder_name
                            ? "/Image/folder.png"
                            : ""
                        }
                        alt="File Icon"
                        height="22px"
                        style={{ marginRight: "5px", marginBottom: "2px" }}
                      />
                      {data?.file_name || data.folder_name}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {formattedSize}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {`${data.created_by}`}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {convertedTimestamp}
                    </TableCell>
                    <TableCell
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <Tooltip
                        title="View"
                        onClick={() => {
                          navigate(data.id, data?.file_name, data.filemongo_id);
                        }}
                      >
                        <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                      </Tooltip>
                      <Tooltip
                        title="Download"
                        onClick={() => {
                          if (data.file_type) {
                            onFileDownload(data.filemongo_id, data.file_name);
                          } else {
                            onDownloadfolders(data.id, data.folder_name);
                          }
                        }}
                      >
                        <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        onClick={() =>
                          handleOpenDeleteFile(data.id, data.file_type)
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={handleVersionClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
