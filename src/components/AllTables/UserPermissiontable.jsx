import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Tooltip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import SmsIcon from "@mui/icons-material/Sms";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SportsVolleyballRoundedIcon from "@mui/icons-material/SportsVolleyballRounded";
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: "Sr. No.", label: "Sr. No." },
    { id: "Cabinet Name", label: "Cabinet Name" },
    { id: "Workspace Name", label: "Workspace Name" },
    { id: "Username", label: "Username" },
    { id: "File /Folder", label: "File /Folder" },
    { id: "Permissions", label: "Permissions", style: { marginLeft: "150px" } },
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

export default function UserPermissiontable({
  rows,
  headCells,
  setPropertys,
  userPermission,
  PermissionPolicy,
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
              {userPermission.map((data, index) => {
                const isItemSelected = isSelected(data.name);
                let userName = "";
                for (let i = 0; i < data.selected_users.length; i++) {
                  userName = userName + "\n" + data.selected_users[i];
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
                      {data.selected_cabinet}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {data.workspace_name}
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
                        {data.selected_users}
                      </abbr>
                    </TableCell>
                    <TableCell>{data.file_name || data.folder_name}</TableCell>
                    <TableCell
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                      align="right"
                    >
                      <Tooltip title="Version">
                        <SportsVolleyballRoundedIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.version ? "grey" : "" }}
                        />
                      </Tooltip>

                      <Tooltip title="Share Cancel">
                        <BlockIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.properties ? "grey" : "" }}
                        />
                      </Tooltip>

                      <Tooltip title="View">
                        <VisibilityIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.view ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data?.rename ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Download">
                        <FileDownloadIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.download_per ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Move">
                        <DriveFileMoveIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data?.move ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Share">
                        <ShareIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.share ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.delete_per ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Comments">
                        <SmsIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.comments ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Properties">
                        <ArticleIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.properties ? "grey" : "" }}
                        />
                      </Tooltip>
                      <Tooltip title="Rights">
                        <AdminPanelSettingsIcon
                          fontSize="small"
                          sx={{ mr: 1, color: data.rights ? "grey" : "" }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!userPermission.length > 0 && (
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
          count={userPermission.length}
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
