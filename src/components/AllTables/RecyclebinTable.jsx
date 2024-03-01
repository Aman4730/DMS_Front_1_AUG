import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FastRewindIcon from "@mui/icons-material/FastRewind";

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
            key={headCell.id}
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

export default function RecyclebinTable({
  rows,
  headCells,
  searchTerm,
  onEditClick,
  allfolderlist,
  onRestoreFiles,
  handleClickOpen,
}) {
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allfolderlist.length) : 0;

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {allfolderlist
                .filter(
                  (item) =>
                    item?.file_name ||
                    item?.folder_name
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row?.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const originalTimestamp = row.updatedAt;
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
                  const fileSizeInBytes = row?.file_size || row?.folder_size;
                  const formattedSize = formatFileSize(fileSizeInBytes);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        // onClick={() => callApi(data)}
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
                            row?.file_name
                              ? getFileIconByExtension(row.file_type)
                              : row?.folder_name
                              ? "/Image/folder.png"
                              : ""
                          }
                          alt="File Icon"
                          height="22px"
                          style={{ marginRight: "5px", marginBottom: "2px" }}
                        />
                        {row?.file_name || row?.folder_name}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {convertedTimestamp}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{ fontSize: "13px" }}
                      >
                        {formattedSize}
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title="Restore"
                          onClick={() =>
                            onRestoreFiles({
                              id: row?.id,
                              user_type: row?.user_type,
                              file_type: row?.file_type,
                              folder_size: row?.folder_size,
                              file_size: row?.file_size,
                              file_name: row?.file_name,
                              workspace_name: row?.workspace_name,
                            })
                          }
                        >
                          <FastRewindIcon sx={{ mr: 1, ml: 2 }} />
                        </Tooltip>
                        <Tooltip
                          title="Delete"
                          onClick={() => handleClickOpen(row.id, row.file_type)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
