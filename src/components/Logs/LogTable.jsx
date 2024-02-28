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
import { visuallyHidden } from "@mui/utils";
import { Button, Stack, TextField } from "@mui/material";
import { AutoComplete, DatePicker } from "antd";

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

export default function LogTable({
  allfolderlist,
  rows,
  headCells,
  handleChangelogs,
  formDataLogs,
  handlefilter,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allfolderlist.length) : 0;
  const options = [
    { value: "All" },
    { value: "Auth" },
    { value: "View" },
    { value: "Create" },
    { value: "Upload" },
    { value: "Delete" },
    { value: "Update" },
    { value: "Download" },
    { value: "Permission" },
  ];
  return (
    <Box>
      <Stack flexDirection="row" style={{ padding: "10px 0px 5px 0px" }}>
        <DatePicker
          placeholder="From"
          format="DD/MM/YY"
          customInput={<input type="text" />}
          style={{ marginRight: "3px" }}
          onChange={(date) => handleChangelogs(null, date, "selectedFromDate")}
          value={formDataLogs.selectedFromDate}
        />

        <DatePicker
          placeholder="to"
          format="DD/MM/YY"
          customInput={
            <input
              type="text"
              style={{
                margin: "0px 4px 0px 4px",
                height: "100%",
              }}
            />
          }
          value={formDataLogs.selectedToDate}
          onChange={(date) => handleChangelogs(null, date, "selectedToDate")}
        />

        {/* <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={[
            "All",
            "Auth",
            "View",
            "Create",
            "Upload",
            "Delete",
            "Download",
          ]}
          sx={{
            width: 180,
            ml: 0.4,
            mr: 1,
            background: "white",
            mt: 0.3,
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                placeholder="Select Categories"
                style={{
                  borderRadius: "6px",
                  height: "32px",
                  marginTop: "-1px",
                  paddingLeft: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}
          onChange={(event, value) =>
            handleChangelogs(event, value, "selectedCategory")
          }
          value={formDataLogs.selectedCategory}
        /> */}
        <AutoComplete
          style={{ width: 200, margin: "2px 0px 0px 4px" }}
          options={options}
          placeholder="Select Categories"
          onChange={(event, value) =>
            handleChangelogs(event, value, "selectedCategory")
          }
          value={formDataLogs.selectedCategory}
        />
        <Button
          variant="contained"
          onClick={handlefilter}
          style={{
            borderRadius: "5px",
            margin: "2px 0px 0px 8px",
            height: "31px",
            outline: "none",
          }}
        >
          View
        </Button>
      </Stack>
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
                ? allfolderlist.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : allfolderlist
              ).map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const originalTimestamp = row.createdAt;
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
                    <TableCell style={{ fontSize: "12px" }}>
                      {convertedTimestamp}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "50px",
                      }}
                    >
                      {row.user_id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      style={{ fontSize: "12px" }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                      }}
                    >
                      {row.action}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {row.system_ip}
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
