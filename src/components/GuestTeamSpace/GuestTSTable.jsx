import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Tooltip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useHistory } from "react-router-dom";
import SmsIcon from "@mui/icons-material/Sms";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablePagination from "@mui/material/TablePagination";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SportsVolleyballRoundedIcon from "@mui/icons-material/SportsVolleyballRounded";
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ backgroundColor: "#FFFFCC" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={headCell.style}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function GuestTSTable({
  rows,
  callApi,
  headCells,
  searchTerm,
  allfolderlist,
  onEditFileClick,
  onFileDownload,
  handleClickMove,
  defaultPermission,
  onDownloadfolders,
  handleClickLinkOpen,
  openEditFolderModal,
  handleOpenDeleteFile,
  handleOpenPermission,
  onEditPermissionClick,
  handleClickOpenCommets,
  handleClickVersionOpen,
  handleClickOpenProperties,
}) {
  const history = useHistory();
  const navigate = (id, data, filemongo_id) => {
    history.push("/fileviewer", {
      id: id,
      file: data,
      filemongo_id: filemongo_id,
      workspace_type: "guestTeamSpace",
      commentHide: defaultPermission?.comment,
    });
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

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
  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {allfolderlist
                ?.filter((item) =>
                  (item.file_name || item.folder_name)
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase())
                )
                .map((data, index) => {
                  const isItemSelected = isSelected(data.name);
                  const originalExpiryTimestamp = data?.expiry_date || "";
                  const originalUpdateTimestamp = data?.updatedAt;
                  const expiryDate = new Date(originalExpiryTimestamp);
                  const updateDate = new Date(originalUpdateTimestamp);
                  const options = {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  };

                  const formattedExpiryDate = expiryDate.toLocaleDateString(
                    "en-GB",
                    options
                  );
                  const formattedUpdateDate = updateDate.toLocaleDateString(
                    "en-GB",
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
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        onClick={() => (data.file_type ? "" : callApi(data))}
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
                      <TableCell style={{ fontSize: "13px" }}>
                        {formattedUpdateDate}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {formattedExpiryDate == "Invalid Date"
                          ? "No Expiry"
                          : formattedExpiryDate}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {data?.shared_by || "Not Shared"}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        {formattedSize}
                      </TableCell>
                      <TableCell
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                        align="right"
                      >
                        {data.file_type && data.versions == true ? (
                          <Tooltip
                            title="Version"
                            onClick={() => handleClickVersionOpen(data)}
                          >
                            <SportsVolleyballRoundedIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {(data.view === "true" ||
                          defaultPermission?.view === "true") && (
                          <Tooltip
                            title="View"
                            onClick={() => {
                              if (data.file_type) {
                                navigate(
                                  data.id,
                                  data?.file_name,
                                  data.filemongo_id
                                );
                              } else {
                                callApi(data);
                              }
                            }}
                          >
                            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        )}
                        {(data.rename === "true" ||
                          defaultPermission?.rename === "true") && (
                          <Tooltip
                            title="Edit"
                            onClick={() => {
                              if (data.file_type) {
                                onEditFileClick(data.id);
                              } else {
                                openEditFolderModal(data?.id);
                              }
                            }}
                          >
                            <EditIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        )}
                        {(data.download === "true" ||
                          defaultPermission?.download === "true") && (
                          <Tooltip
                            title="Download"
                            onClick={() => {
                              if (data.file_type) {
                                onFileDownload(
                                  data.filemongo_id,
                                  data.file_name
                                );
                              } else {
                                onDownloadfolders(data.id, data.folder_name);
                              }
                            }}
                          >
                            <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        )}
                        {(data.move === "true" ||
                          defaultPermission?.move === "true") && (
                          <Tooltip
                            title="Move"
                            onClick={() => handleClickMove(data)}
                          >
                            <DriveFileMoveIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                        )}
                        {(data.share === "true" ||
                          defaultPermission?.share === "true") && (
                          <Tooltip
                            title="Share"
                            onClick={() =>
                              handleClickLinkOpen(
                                data.id,
                                data.file_type,
                                data?.file_name || data.folder_name,
                                data?.expiry_date 
                              )
                            }
                          >
                            <ShareIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        )}
                        {(data.delete_action === "true" ||
                          defaultPermission?.delete_action === "true") && (
                          <Tooltip
                            title="Delete"
                            onClick={() =>
                              handleOpenDeleteFile(data.id, data.file_type)
                            }
                          >
                            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        )}
                        {(data.comment === "true" ||
                          defaultPermission?.comment === "true") && (
                          <Tooltip
                            title="Comments"
                            onClick={() => handleClickOpenCommets(data?.id)}
                          >
                            <SmsIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        )}
                        {(data.properties === "true" ||
                          defaultPermission?.properties === "true") && (
                          <Tooltip
                            title="Properties"
                            onClick={() => handleClickOpenProperties(data)}
                          >
                            <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        )}
                        {(data.rights === "true" ||
                          defaultPermission?.rights === "true") && (
                          <Tooltip
                            title="Rights"
                            onClick={() => {
                              if (data?.permission?.id) {
                                onEditPermissionClick(
                                  data?.id,
                                  data?.permission?.id,
                                  data?.file_name,
                                  data?.folder_name,
                                  data?.file_type
                                );
                              } else {
                                handleOpenPermission(
                                  data?.id,
                                  data?.file_type,
                                  data?.file_name,
                                  data?.folder_name
                                );
                              }
                            }}
                          >
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={allfolderlist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
            style: {
              marginBottom: "13px",
            },
          }}
          nextIconButtonProps={{
            style: {
              marginBottom: "12px",
              color: "green",
            },
            tabIndex: -1,
          }}
          backIconButtonProps={{
            style: {
              marginBottom: "12px",
              color: "green",
            },
            tabIndex: -1,
          }}
          style={{
            height: "40px",
            overflow: "hidden", // Hide any overflow content
          }}
        />
      </Paper>
    </Box>
  );
}
