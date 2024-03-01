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
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell?.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell?.id ? order : false}
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
  isLogin,
  callApi,
  headCells,
  propertys,
  openModal,
  searchTerm,
  setPropertys,
  allfolderlist,
  openFileUpload,
  onFileDownload,
  onDownloadfolders,
  PermissionPolicy,
  handleClickLinkOpen,
  handleOpenDeleteFile,
}) {
  const property = PermissionPolicy?.map((data) => {
    setPropertys(data);
  });
  const history = useHistory();
  const navigate = (id, data, filemongo_id) => {
    history.push("/fileviewer", {
      id: id,
      file: data,
      filemongo_id: filemongo_id,
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
  let permission = localStorage.getItem("permission");
  let permissionObject = JSON.parse(permission);
  console.log(permissionObject, "djkfsdg");
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
              {allfolderlist?.map((data, index) => {
                const isItemSelected = isSelected(data?.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const originalTimestamp = data?.updatedAt;
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
                // if (
                //   (((data?.name == "view") == true) ===
                //     permissionObject?.view) ==
                //     true ||
                //   (((data?.name == "share") == true) ===
                //     permissionObject?.share) ==
                //     true ||
                //   (((data?.name == "move") == true) ===
                //     permissionObject?.move) ==
                //     true ||
                //   (((data?.name == "rights") == true) ===
                //     permissionObject?.rights) ==
                //     true ||
                //   (((data?.name == "rename") == true) ===
                //     permissionObject?.rename) ==
                //     true ||
                //   (((data?.name == "upload_folder") == true) ===
                //     permissionObject?.upload_folder) ==
                //     true ||
                //   (((data?.name == "create_folder") == true) ===
                //     permissionObject?.create_folder) ==
                //     true ||
                //   (((data?.name == "upload_file") == true) ===
                //     permissionObject?.upload_file) ==
                //     true ||
                //   (((data?.name == "delete") == true) ===
                //     permissionObject?.delete_per) ==
                //     true ||
                //   (((data?.name == "download") == true) ===
                //     permissionObject?.download_per) ==
                //     true ||
                //   (((data?.name == "comment") == true) ===
                //     permissionObject?.comments) ==
                //     true ||
                //   (((data?.name == "properties") == true) ===
                //     permissionObject?.properties) ==
                //     true
                // )
                // const parentFolderPermissions = {
                //   read: true,
                //   write: true,
                //   execute: true,
                // };
                // setPermissions(rootFolder, parentFolderPermissions);
                // function setPermissions(parentFolder) {
                //   parentFolder.permissions = true;

                //   if (
                //     parentFolder.children &&
                //     parentFolder.children.length > 0
                //   ) {
                //     parentFolder.children.forEach((child) => {
                //       setPermissions(child, permissions);
                //     });
                //   }

                //   if (parentFolder.files && parentFolder.files.length > 0) {
                //     parentFolder.files.forEach((file) => {
                //       file.permissions = permissions;
                //     });
                //   }
                // }

                // const rootFolder = {
                //   name: "Root",
                //   permissions: null,
                //   children: [
                //     {
                //       name: "Folder A",
                //       permissions: null,
                //       children: [
                //         {
                //           name: "Subfolder A1",
                //           permissions: null,
                //           children: [],
                //           files: [
                //             {
                //               name: "File1.txt",
                //               permissions: null,
                //             },
                //             {
                //               name: "File2.txt",
                //               permissions: null,
                //             },
                //           ],
                //         },
                //       ],
                //       files: [],
                //     },
                //     {
                //       name: "Folder B",
                //       permissions: null,
                //       children: [],
                //       files: [
                //         {
                //           name: "File3.txt",
                //           permissions: null,
                //         },
                //       ],
                //     },
                //   ],
                //   files: [],
                // };
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={data?.id}
                    selected={isItemSelected}
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
                      {data?.file_name || data?.folder_name}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {convertedTimestamp}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {data?.shared_by}
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
                      {data.view == "true" ? (
                        <Tooltip
                          title="View"
                          onClick={() => {
                            navigate(
                              data?.id,
                              data?.file_name,
                              data?.filemongo_id
                            );
                          }}
                        >
                          <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.rename == "true" ? (
                        <Tooltip title="Edit">
                          <EditIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.download == "true" ? (
                        <Tooltip
                          title="Download"
                          onClick={() => {
                            if (data.file_type) {
                              onFileDownload(
                                data?.filemongo_id,
                                data?.file_name
                              );
                            } else {
                              onDownloadfolders(data?.id);
                            }
                          }}
                        >
                          <FileDownloadIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.move == "true" ? (
                        <Tooltip title="Move">
                          <DriveFileMoveIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.share == "true" ? (
                        <Tooltip
                          title="Share"
                          onClick={() => handleClickLinkOpen(data?.id)}
                        >
                          <ShareIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.delete_action == "true" ? (
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            handleOpenDeleteFile(
                              data?.id,
                              data?.file_type,
                              data?.filemongo_id
                            )
                          }
                        >
                          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.comment == "true" ? (
                        <Tooltip title="Comments">
                          <SmsIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.properties == "true" ? (
                        <Tooltip title="Properties">
                          <ArticleIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {data.rights == "true" ? (
                        <Tooltip title="Rights" style={{ marginRight: "35px" }}>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    {/* <TableCell
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                      align="right"
                    >
                      {data?.view === "true" && (
                        <Tooltip
                          title="View"
                          onClick={() => {
                            navigate(
                              data?.id,
                              data?.file_name,
                              data?.filemongo_id
                            );
                          }}
                        >
                          <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.rename === "true" && (
                        <Tooltip title="Edit">
                          <EditIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.download_per === "true" && (
                        <Tooltip
                          title="Download"
                          onClick={() => {
                            if (data.file_type) {
                              onFileDownload(
                                data?.filemongo_id,
                                data?.file_name
                              );
                            } else {
                              onDownloadfolders(data?.id);
                            }
                          }}
                        >
                          <FileDownloadIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.move === "true" && (
                        <Tooltip title="Move">
                          <DriveFileMoveIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.share === "true" && (
                        <Tooltip
                          title="Share"
                          onClick={() => handleClickLinkOpen(data?.id)}
                        >
                          <ShareIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.delete_per === "true" && (
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            handleOpenDeleteFile(
                              data?.id,
                              data?.file_type,
                              data?.filemongo_id
                            )
                          }
                        >
                          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.comments === "true" && (
                        <Tooltip title="Comments">
                          <SmsIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
                      )}
                      {data?.properties === "true" && (
                        <Tooltip title="Properties">
                          <ArticleIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                      )}
                      {data?.rights === "true" && (
                        <Tooltip title="Rights" style={{ marginRight: "35px" }}>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </Tooltip>
                      )}
                    </TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
