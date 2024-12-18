import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
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

export default function DocmetaTable({
  rows,
  setModal,
  headCells,
  searchTerm,
  onProperties,
  handleClickOpen,
}) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("calories");
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
  const filteredRows = rows?.filter((row) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row.metadata_name.toLowerCase().includes(searchLower) ||
      row.cabinet_name.toLowerCase().includes(searchLower) ||
      row.workspace_name.toLowerCase().includes(searchLower) ||
      row.doctype.toLowerCase().includes(searchLower) 
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
              {rowsToDisplay.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell style={{ fontSize: "12px" }}>
                      {row.metadata_name}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {row.cabinet_name}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {row.workspace_name}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {row.doctype}
                    </TableCell>
                    <TableCell>
                      <ul style={{ display: "flex", flexDirection: "row" }}>
                        <li
                          onClick={() => setModal({ metaedit: true })}
                          style={{ cursor: "pointer" }}
                        >
                          <AdminPanelSettingsIcon
                            style={{ fontSize: "23px" }}
                            onClick={() => onProperties(row?.doctype, row.id)}
                          />
                        </li>
                        <li>
                          <Tooltip
                            title="Delete"
                            onClick={() => handleClickOpen(row.id)}
                          >
                            <DeleteIcon
                              sx={{ ml: 1, mr: 1 }}
                              fontSize="small"
                            />
                          </Tooltip>
                        </li>
                      </ul>
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
