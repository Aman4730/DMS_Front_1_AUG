import * as React from "react";
import Box from "@mui/material/Box";
import { Switch } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CloudSyncIcon from "@mui/icons-material/CloudSync";

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

export default function UserTable({
  rows,
  headCells,
  searchTerm,
  onEditClick,
  onBlockClick,
  handleClickOpen,
  handleClickSyncOpen,
}) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("");
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
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              )
                ?.filter((item) =>
                  (item.display_name || item.email)
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase())
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const originalTimestamp = row.validity_date;
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
                    "en-GB",
                    options
                  );

                  function formatSizeInGB(sizeInBytes) {
                    return sizeInBytes / (1024 * 1024);
                  }
                  const formattedSize = formatSizeInGB(row.max_quota);

                  return (
                    <TableRow
                      key={index}
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.display_name}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.email}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {convertedTimestamp == "Invalid Date"
                          ? "No Expiry"
                          : convertedTimestamp}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.user_type}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.emp_code}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {formattedSize}
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title="Omega Sync"
                          onClick={() => handleClickSyncOpen(row.emp_code)}
                        >
                          <CloudSyncIcon
                            sx={{ ml: 1, mr: 1 }}
                            fontSize="small"
                          />
                        </Tooltip>
                        <Tooltip
                          title="Edit"
                          onClick={() => onEditClick(row.id)}
                        >
                          <EditIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip
                          title="Delete"
                          onClick={() => handleClickOpen(row.id)}
                        >
                          <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Switch
                          checked={row.user_status === "true"}
                          size="small"
                          onChange={(event) =>
                            onBlockClick(row.id, event.target.checked)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!rows.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
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
