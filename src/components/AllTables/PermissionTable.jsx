import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Tooltip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import SmsIcon from "@mui/icons-material/Sms";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
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
import SportsVolleyballRoundedIcon from "@mui/icons-material/SportsVolleyballRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@mui/material";
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "Profile_Id", label: "Id" },
    { id: "Email_Id", label: "Email Id" },
    { id: "Authentication", label: "Authentication" },
    { id: "Security", label: "Security" },
    { id: "Server IP / Url", label: "Server IP/Url" },
    { id: "Action", label: "Action", style: { marginLeft: "23px" } },
  ];
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

export default function PermissionTable({
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
  PermissionPolicy,
  onDownloadfolders,
  handleClickLinkOpen,
  handleOpenDeleteFile,
  handleClickOpenCommets,
  handleClickVersionOpen,
  handleClickOpenProperties,
  getSmpt,
  onEditClick,
  onBlockClick,
}) {
  const property = PermissionPolicy?.map((data) => {
    setPropertys(data);
  });
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage) : 0;

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
              headCells={headCells}
            />
            <TableBody>
              {getSmpt
                // ?.filter((data) =>
                //   data.email?.toLowerCase().includes(searchTerm?.toLowerCase())
                // )
                .map((data, index) => {
                  const isItemSelected = isSelected(data.name);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        className="tablefont"
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        {data?.id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "180px",
                        }}
                      >
                        {data.username}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {data.authentication}
                      </TableCell>
                      <TableCell>{data.security}</TableCell>
                      <TableCell>{data.host_serverip}</TableCell>
                      <TableCell
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        <Switch
                          checked={data.smtp_status === true}
                          size="small"
                          onChange={(event) =>
                            onBlockClick(data.id, event.target.checked)
                          }
                          disabled={data.smtp_status ? true : false}
                        />
                        <Tooltip
                          title="Edit"
                          onClick={() => onEditClick(data.id)}
                        >
                          <EditIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
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
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={getSmpt.length}
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
