import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import "./style.css";

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "name", label: "Recent File/Folder" },
    { id: "createdBy", label: "Created By" },
    { id: "workspace_name", label: "WorkSpace" },
    { id: "Size", label: "Size" },
    { id: "updatedAt", label: "Updated D/T" },
  ];
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              backgroundColor: "#FFFFCC",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
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

export default function DataGridCard({ tableData }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
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
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper>
        <TableContainer
          style={{
            height: "260px",
            width: "65.7vw",
            borderRadius: "10px",
          }}
        >
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {tableData?.map((data, index) => {
                const isItemSelected = isSelected(data.name);
                const options = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                };
                const updateAt = new Date(data.updatedAt);
                const updateAtdate = updateAt.toLocaleTimeString(
                  "en-US",
                  options
                );
                const isEvenRow = index % 2 === 1;
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
                    key={index}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isEvenRow ? "#F4F6F6 " : "transparent",
                    }}
                  >
                    <TableCell
                      className="tablefont"
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                        transition: "background-color 0.3s ease",
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
                        style={{ marginRight: "10px", marginBottom: "2px" }}
                      />
                      {/* <svg href="/Image/docx.svg"></svg> */}

                      {data?.file_name || data?.folder_name}
                    </TableCell>

                    <TableCell style={{ fontSize: "12px" }}>
                      {data.email}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {data.workspace_name}
                    </TableCell>

                    <TableCell
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {formattedSize}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {updateAtdate}
                    </TableCell>
                  </TableRow>
                );
              })}
              {tableData.length > 0 ? (
                ""
              ) : (
                <TableRow
                  style={{
                    height: 53,
                  }}
                >
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
