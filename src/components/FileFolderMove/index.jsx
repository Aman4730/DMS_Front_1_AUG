import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function FileFolderMove({
  list,
  openMove,
  moveData,
  callApi,
  findFolder,
  allMoveFile,
  hideMoveData,
  callApiHeader,
  moveFileFolder,
  handleCloseMove,
  onClickWorksapce,
  onSubmitUpdatefolder,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={openMove.status}
        onClose={handleCloseMove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <div
          style={{
            display: "flex",
            margin: "7px 0px 3px 10px",
            fontSize: "16px",
          }}
        >
          {list?.map((data, index) => (
            <div
              onClick={() => callApiHeader({ ...data, index })}
              style={{ cursor: "pointer" }}
            >
              {data?.folder_name ? (
                <p
                  onClick={() => findFolder(data)}
                  style={{ cursor: "pointer" }}
                >
                  <spam onClick={onClickWorksapce}>Workspace</spam> /
                  {data?.folder_name} /
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <Paper style={{ width: 600 }}>
          <div>
            {hideMoveData === false ? (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#FFFFCC" }}>
                      <TableCell>Workspace Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {moveData?.map((data) => {
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
                            onClick={() => moveFileFolder(data)}
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
                              src={"/Image/default.svg"}
                              alt="File Icon"
                              height="22px"
                              style={{
                                marginRight: "5px",
                                marginBottom: "2px",
                              }}
                            />
                            {data.workspace_name}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#FFFFCC" }}>
                      <TableCell>File Version</TableCell>
                      <TableCell>File Size</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {allMoveFile?.map((data) => {
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
                          return (
                            (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB"
                          );
                        } else {
                          return (
                            (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) +
                            " GB"
                          );
                        }
                      }
                      const fileSizeInBytes = data?.folder_size;
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
                              src={"/Image/folder.png"}
                              alt="File Icon"
                              height="22px"
                              style={{
                                marginRight: "5px",
                                marginBottom: "2px",
                              }}
                            />
                            {data.folder_name}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "13px",
                            }}
                          >
                            {formattedSize}
                          </TableCell>
                          <TableCell>{data.user_email}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Paper>
        <DialogActions>
          <Button onClick={handleCloseMove}>Close</Button>
          <Button onClick={onSubmitUpdatefolder}>Move</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
