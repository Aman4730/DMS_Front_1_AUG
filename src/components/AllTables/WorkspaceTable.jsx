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
import LockPersonIcon from "@mui/icons-material/LockPerson";

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

export default function WorkspaceTable({
  rows,
  headCells,
  searchTerm,
  onEditClick,
  allfolderlist,
  handleClickOpen,
  onPermissionClick,
  onEditPermissionClick,
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

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allfolderlist?.length)
      : 0;

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
                ? allfolderlist?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : allfolderlist
              )
                ?.filter((item) =>
                  item.workspace_name
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase())
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // function formatSizeInGB(sizeInBytes) {
                  //   return sizeInBytes / (1024 * 1024 * 1024);
                  // }

                  // const formattedSize = formatSizeInGB(row.quota);
                  function formatFileSize(sizeInBytes) {
                    if (sizeInBytes < 1024) {
                      return sizeInBytes + " B";
                    } else if (sizeInBytes < 1024 * 1024) {
                      return (sizeInBytes / 1024).toFixed(2) + " KB";
                    } else if (sizeInBytes < 1024 * 1024) {
                      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
                    } else {
                      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " GB";
                    }
                  }
                  const fileSizeInBytes = row.quota;
                  const formattedSize = formatFileSize(fileSizeInBytes);
                  let userName = "";
                  for (let i = 0; i < row.selected_users.length; i++) {
                    userName = userName + "\n" + row.selected_users[i];
                  }
                  const fileSizeInBytes1 = row.quota / 1024 / 1024;
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
                        style={{
                          fontSize: "12px",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.workspace_name}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.selected_cabinet}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.selected_groups}
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
                          title={userName}
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          {row.selected_users}
                        </abbr>
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {row.workspace_type}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {formattedSize}
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title="Edit"
                          onClick={() => onEditClick(row.id)}
                        >
                          <EditIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip
                          className=""
                          // onClick={() =>
                          //   onPermissionClick(row.id, row.workspace_type)
                          // }
                          onClick={() => {
                            if (row?.workspacePermission?.id) {
                              onEditPermissionClick({
                                workspace_name: row?.workspace_name,
                                id: row?.workspacePermission?.id,
                                policy_type:
                                  row?.workspacePermission?.policy_type,
                                workspace_id:
                                  row?.workspacePermission?.workspace_id,
                              });
                            } else {
                              onPermissionClick(
                                row.id,
                                row.workspace_type,
                                row.workspace_name
                              );
                            }
                          }}
                        >
                          <LockPersonIcon
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"" + row.id}
                            icon="icon ni ni-na"
                            direction="top"
                            text="Edit"
                            style={{
                              backgroundColor: "transparent",
                              boxShadow: "none",
                              // color: "#454545",
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          title="Delete"
                          onClick={() => handleClickOpen(row.id)}
                        >
                          <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
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
          count={allfolderlist?.length}
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
