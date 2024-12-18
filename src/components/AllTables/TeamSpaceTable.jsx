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
import PreviewIcon from "@mui/icons-material/Preview";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
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

export default function TeamSpaceTable({
  rows,
  isLogin,
  callApi,
  headCells,
  searchTerm,
  disabledBtn,
  allfolderlist,
  onEditFileClick,
  onFileDownload,
  handleClickMove,
  onDownloadfolders,
  handleClickLinkOpen,
  openEditFolderModal,
  handleOpenDeleteFile,
  handleClickShareOpen,
  handleOpenPermission,
  onEditPermissionClick,
  handleClickOpenCommets,
  workspacePermissionWs1,
  handleClickVersionOpen,
  onFileWatermarkDownload,
  handleClickOpenProperties,
}) {
  const history = useHistory();
  const navigate = (id, data, filemongo_id, watermark) => {
    history.push("/fileviewer", {
      id: id,
      file: data,
      filemongo_id: filemongo_id,
      workspace_type: "TeamSpace",
      commentHide: "true",
      watermark: watermark,
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
  const handlClickData = (data) => {
    setPage(0);
    callApi(data);
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setRowsPerPage(allfolderlist.length);
      setPage(0);
    } else {
      setRowsPerPage(parseInt(value, 10));
      setPage(0);
    }
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
  const filteredRows = allfolderlist.filter((row) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row?.file_name?.toLowerCase().includes(searchLower) ||
      row?.folder_name?.toLowerCase().includes(searchLower) ||
      row?.user_email?.toLowerCase().includes(searchLower)
    );
  });
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const rowsToDisplay = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  React.useEffect(() => {
    setPage(0);
  }, [searchTerm]);
  3;
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
              {rowsToDisplay.map((data, index) => {
                const isItemSelected = isSelected(data.name);
                const originalTimestamp = data.updatedAt;
                const originalDate = new Date(originalTimestamp);
                const originalExpiryDate = new Date(data?.expiry_date);
                const options = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                };
                const convertedTimestamp = originalDate.toLocaleString(
                  "en-GB",
                  options
                );
                const convertedExpiryDate = originalExpiryDate.toLocaleString(
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

                let shared_by = "";
                for (let i = 0; i < data?.shared_by?.length; i++) {
                  shared_by = shared_by + "\n" + data?.shared_by[i];
                }
                let share_with = "";
                for (let i = 0; i < data?.share_with?.length; i++) {
                  share_with = share_with + "\n" + data?.share_with[i];
                }
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{
                      cursor: data.file_type ? "" : "pointer",
                    }}
                  >
                    <TableCell
                      onClick={() =>
                        data.file_type ? "" : handlClickData(data)
                      }
                      className="tablefont"
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "250px",
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
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "250px",
                      }}
                    >
                      {convertedTimestamp}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "250px",
                      }}
                    >
                      {convertedExpiryDate == "Invalid Date"
                        ? "No Expiry"
                        : convertedExpiryDate}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                      }}
                    >
                      <abbr
                        title={shared_by}
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        {data.shared_by || "Not Shared"}
                      </abbr>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                      }}
                    >
                      <abbr
                        title={share_with}
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        {data.share_with || "Not Shared"}
                      </abbr>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "250px",
                      }}
                    >
                      {formattedSize}
                    </TableCell>
                    {isLogin.user_type == "Admin" ? (
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
                        {data?.shared_by?.length > 0 &&
                          (data?.share_with?.length > 0 ? (
                            <Tooltip
                              title="Share Cancel"
                              onClick={() =>
                                handleClickShareOpen(data?.id, data?.file_type)
                              }
                            >
                              <SettingsBackupRestoreIcon
                                fontSize="small"
                                sx={{ mr: 1 }}
                              />
                            </Tooltip>
                          ) : (
                            ""
                          ))}
                        {data.file_type && (
                          <>
                            <Tooltip
                              title="View Watermark"
                              onClick={() => {
                                if (data.file_type) {
                                  navigate(
                                    data.id,
                                    data?.file_name,
                                    data?.filemongo_id,
                                    true
                                  );
                                } else {
                                  callApi(data);
                                }
                              }}
                            >
                              <PreviewIcon fontSize="small" sx={{ mr: 1 }} />
                            </Tooltip>
                            <Tooltip
                              title={
                                !disabledBtn
                                  ? "Download Watermark"
                                  : "Download Processing..."
                              }
                              onClick={() => {
                                if (!disabledBtn) {
                                  if (data.file_type) {
                                    onFileWatermarkDownload(
                                      data.filemongo_id,
                                      data.file_name,
                                      data.file_size,
                                      data.file_type
                                    );
                                  }
                                }
                              }}
                            >
                              <SystemUpdateAltIcon
                                fontSize="small"
                                sx={{ mr: 1 }}
                              />
                            </Tooltip>
                          </>
                        )}
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
                        <Tooltip
                          title="Edit"
                          onClick={() => {
                            if (data.file_type) {
                              onEditFileClick(data.id, data.file_type);
                            } else {
                              openEditFolderModal(data?.id);
                            }
                          }}
                        >
                          <EditIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip
                          title={
                            !disabledBtn ? "Download" : "Download Processing..."
                          }
                          onClick={() => {
                            if (!disabledBtn) {
                              if (data.file_type) {
                                onFileDownload(
                                  data.filemongo_id,
                                  data.file_name,
                                  data.file_size,
                                  data.file_type
                                );
                              } else {
                                onDownloadfolders(
                                  data.id,
                                  data.folder_name,
                                  data.folder_size
                                );
                              }
                            }
                          }}
                        >
                          <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
                        <Tooltip
                          title="Move"
                          onClick={() => handleClickMove(data)}
                        >
                          <DriveFileMoveIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
                        <Tooltip
                          title="Share"
                          onClick={() =>
                            handleClickLinkOpen(
                              data.id,
                              data.file_type,
                              data?.file_name || data.folder_name
                            )
                          }
                        >
                          <ShareIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            handleOpenDeleteFile(data.id, data.file_type)
                          }
                        >
                          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip
                          title="Comments"
                          onClick={() => handleClickOpenCommets(data?.id)}
                        >
                          <SmsIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
                        <Tooltip
                          title="Properties"
                          onClick={() => handleClickOpenProperties(data)}
                        >
                          <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
                        </Tooltip>
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
                      </TableCell>
                    ) : (
                      <TableCell
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                        align="right"
                      >
                        {data?.file_type && data.versions == true ? (
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
                        {data?.isShared === true && (
                          <Tooltip
                            title="Share Cancel"
                            onClick={() =>
                              handleClickShareOpen(data?.id, data?.file_type)
                            }
                          >
                            <SettingsBackupRestoreIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                        )}
                        {data.file_type && (
                          <>
                            {data?.permission?.view_watermark == true ||
                            workspacePermissionWs1?.view_watermark == true ? (
                              <Tooltip
                                title="View Watermark"
                                onClick={() => {
                                  if (data.file_type) {
                                    navigate(
                                      data.id,
                                      data?.file_name,
                                      data?.filemongo_id,
                                      true
                                    );
                                  } else {
                                    callApi(data);
                                  }
                                }}
                              >
                                <PreviewIcon fontSize="small" sx={{ mr: 1 }} />
                              </Tooltip>
                            ) : (
                              ""
                            )}
                            {data?.permission?.download_watermark == true ||
                            workspacePermissionWs1?.download_watermark ==
                              true ? (
                              <Tooltip
                                title={
                                  !disabledBtn
                                    ? "Download Watermark"
                                    : "Download Processing..."
                                }
                                onClick={() => {
                                  if (!disabledBtn) {
                                    if (data.file_type) {
                                      onFileWatermarkDownload(
                                        data.filemongo_id,
                                        data.file_name,
                                        data.file_size,
                                        data.file_type
                                      );
                                    }
                                  }
                                }}
                              >
                                <SystemUpdateAltIcon
                                  fontSize="small"
                                  sx={{ mr: 1 }}
                                />
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                        {data?.permission?.view == true ||
                        workspacePermissionWs1?.view == true ? (
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
                        ) : (
                          ""
                        )}

                        {data.permission?.rename == true ||
                        workspacePermissionWs1?.rename == true ? (
                          <Tooltip
                            title="Edit"
                            onClick={() => {
                              if (data.file_type) {
                                onEditFileClick(data.id, data.file_type);
                              } else {
                                openEditFolderModal(data?.id);
                              }
                            }}
                          >
                            <EditIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.download_per == true ||
                        workspacePermissionWs1?.download_per == true ? (
                          <Tooltip
                            title={
                              !disabledBtn
                                ? "Download"
                                : "Download Processing..."
                            }
                            onClick={() => {
                              if (!disabledBtn) {
                                if (data.file_type) {
                                  onFileDownload(
                                    data.filemongo_id,
                                    data.file_name,
                                    data.file_size,
                                    data.file_type
                                  );
                                } else {
                                  onDownloadfolders(
                                    data.id,
                                    data.folder_name,
                                    data.folder_size
                                  );
                                }
                              }
                            }}
                          >
                            <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data.permission?.move == true ||
                        workspacePermissionWs1?.move == true ? (
                          <Tooltip
                            title="Move"
                            onClick={() => handleClickMove(data)}
                          >
                            <DriveFileMoveIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.share == true ||
                        workspacePermissionWs1?.share == true ? (
                          <Tooltip
                            title="Share"
                            onClick={() =>
                              handleClickLinkOpen(
                                data.id,
                                data.file_type,
                                data?.file_name || data.folder_name
                              )
                            }
                          >
                            <ShareIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.delete_per == true ||
                        workspacePermissionWs1?.delete_per == true ? (
                          <Tooltip
                            title="Delete"
                            onClick={() =>
                              handleOpenDeleteFile(data.id, data.file_type)
                            }
                          >
                            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.comments == true ||
                        workspacePermissionWs1?.comments == true ? (
                          <Tooltip
                            title="Comments"
                            onClick={() => handleClickOpenCommets(data?.id)}
                          >
                            <SmsIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.properties == true ||
                        workspacePermissionWs1?.properties == true ? (
                          <Tooltip
                            title="Properties"
                            onClick={() => handleClickOpenProperties(data)}
                          >
                            <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {data?.permission?.rights == true ||
                        workspacePermissionWs1?.rights == true ? (
                          <Tooltip
                            title="Rights"
                            onClick={() => {
                              if (data?.permission?.id) {
                                onEditPermissionClick({
                                  id: data?.id,
                                  permission_id: data?.permission?.id,
                                });
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
                        ) : (
                          ""
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {!filteredRows.length > 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, "All"]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={
            rowsPerPage === "All" ? filteredRows.length : rowsPerPage
          }
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
