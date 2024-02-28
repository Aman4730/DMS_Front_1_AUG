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
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import ArticleIcon from "@mui/icons-material/Article";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { Tooltip } from "@mui/material";
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

export default function CommonTable({
  rows,
  headCells,
  allfolderlist,
  callApi,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
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
              {allfolderlist.map((data, index) => {
                const isItemSelected = isSelected(data.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, data.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={data.name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell onClick={() => callApi(data)}>
                      <img
                        src="/folder.png"
                        alt="Folder Icon"
                        height="22px"
                        style={{ marginRight: "5px", marginBottom: "2px" }}
                      />
                      {data.folder_name}
                    </TableCell>
                    <TableCell onClick={() => callApi(data)}>
                      {data.folder_name}
                    </TableCell>
                    <TableCell onClick={() => callApi(data)}>
                      {data.folder_name}
                    </TableCell>
                    <TableCell onClick={() => callApi(data)}>
                      {data.folder_name}
                    </TableCell>
                    <TableCell style={{ cursor: "pointer" }} align="right">
                      <Tooltip title="View">
                        <VisibilityIcon />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditIcon sx={{ ml: 1, mr: 1 }} />
                      </Tooltip>
                      <Tooltip title="Download">
                        <FileDownloadIcon />
                      </Tooltip>
                      <Tooltip title="Move">
                        <DriveFileMoveIcon sx={{ ml: 1, mr: 1 }} />
                      </Tooltip>
                      <Tooltip title="Share">
                        <ShareIcon />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon sx={{ ml: 1, mr: 1 }} />
                      </Tooltip>
                      <Tooltip title="Comments">
                        <SmsIcon />
                      </Tooltip>
                      <Tooltip title="Properties">
                        <ArticleIcon sx={{ ml: 1, mr: 1 }} />
                      </Tooltip>
                      <Tooltip title="Rights">
                        <LocalPoliceIcon />
                      </Tooltip>
                    </TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={5} // Set the rows per page to 5
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
