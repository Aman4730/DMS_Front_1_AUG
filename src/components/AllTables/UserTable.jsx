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
  const { order, orderBy, onRequestSort,headCells } = props;
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
              hideSortIcon={true}
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
  const [orderBy, setOrderBy] = React.useState("display_name");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    console.log(property,"=property")

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setRowsPerPage(rows.length);
      setPage(0);
    } else {
      setRowsPerPage(parseInt(value, 10));
      setPage(0);
    }
  };

  const filteredRows = rows.filter((row) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row.display_name.toLowerCase().includes(searchLower) ||
      row.email.toLowerCase().includes(searchLower) ||
      (row.validity_date &&
        new Date(row.validity_date)
          .toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .includes(searchLower)) ||
      (row.last_login &&
        new Date(row.last_login)
          .toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .includes(searchLower)) ||
      row.user_type.toLowerCase().includes(searchLower) ||
      row.emp_code.toLowerCase().includes(searchLower) ||
      formatSizeInGB(row.max_quota).toString().includes(searchLower)
    );
  });

  React.useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const sortedRows = (rows) => {
    console.log(orderBy, "======orderBy");

    return rows.sort((a, b) => {
      const aValue = a[orderBy] || "";
      const bValue = b[orderBy] || "";
      return order === "asc"
        ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
        : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
    });
  };

  const sortedFilteredRows = sortedRows(filteredRows);

  const rowsToDisplay =
    rowsPerPage === "All"
      ? sortedFilteredRows
      : sortedFilteredRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );

  function formatSizeInGB(sizeInBytes) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rowsToDisplay.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const originalTimestamp = row.validity_date;
                const originalDate = new Date(originalTimestamp);
                const lastLoginDate = new Date(row.last_login);
                const deactivatedDate = new Date(row.deactivatedDate);
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
                const lastLoginFormate = lastLoginDate?.toLocaleString(
                  "en-GB",
                  options
                );
                const deactivatedDateFormate = deactivatedDate?.toLocaleString(
                  "en-GB",
                  options
                );
                const formattedSize = formatSizeInGB(row.max_quota);

                return (
                  <TableRow
                    key={index}
                    hover
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
                      {lastLoginFormate == "Invalid Date"
                        ? "Not Logged In"
                        : lastLoginFormate}
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
                        <CloudSyncIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                      </Tooltip>
                      <Tooltip title="Edit" onClick={() => onEditClick(row.id)}>
                        <EditIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        onClick={() => handleClickOpen(row.id)}
                      >
                        <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                      </Tooltip>
                      {row?.user_status == "false" ? (
                        <Tooltip
                          title={
                            row?.deactivatedReason && deactivatedDateFormate
                              ? `${row.deactivatedReason} , Deactivated Date : ${deactivatedDateFormate}`
                              : row?.deactivatedReason || deactivatedDateFormate
                          }
                        >
                          <Switch
                            checked={row.user_status === "true"}
                            size="small"
                            onChange={(event) =>
                              onBlockClick(row.id, event.target.checked)
                            }
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title={row?.deactivatedReason}>
                          <Switch
                            checked={row.user_status === "true"}
                            size="small"
                            onChange={(event) =>
                              onBlockClick(row.id, event.target.checked)
                            }
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
          rowsPerPageOptions={[10, 25, 50, { label: "All", value: "All" }]}
          component="div"
          count={sortedFilteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
