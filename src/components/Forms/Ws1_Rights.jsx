import * as React from "react";
import { Button } from "../Component";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Checkbox,
  TextField,
  Typography,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";
export default function Ws1_Rights({
  data,
  isLogin,
  openDialog,
  permission,
  autocomplete,
  userDropdowns,
  checkboxValues,
  groupsDropdown,
  permissionForm,
  handleCheckboxChange,
  handleClickPermission,
  handleClosePermission,
  workspacePermissionWs1,
  handleAutocompleteChange,
}) {
  const { title, permissionArray } = permission;
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClosePermission}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm" //xs, sm, md, lg, xl
      >
        <DialogTitle fontSize="17px">{title}</DialogTitle>
        <DialogContent>
          <Grid container pt={0.8} spacing={1}>
            {autocomplete && (
              <>
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={groupsDropdown || ""}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="selected_group" />
                    )}
                    value={permissionForm?.selected_group}
                    onChange={(event, value) =>
                      handleAutocompleteChange("selected_group", value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={userDropdowns || ""}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="Selected Users" />
                    )}
                    value={permissionForm?.selected_users}
                    onChange={(event, value) =>
                      handleAutocompleteChange("selected_users", value)
                    }
                  />
                </Grid>
              </>
            )}

            {permissionArray?.map((data) => {
              if (
                (((data?.name == "view") == true) ===
                  workspacePermissionWs1?.view) ==
                  true ||
                (((data?.name == "share") == true) ===
                  workspacePermissionWs1?.share) ==
                  true ||
                (((data?.name == "move") == true) ===
                  workspacePermissionWs1?.move) ==
                  true ||
                (((data?.name == "rights") == true) ===
                  workspacePermissionWs1?.rights) ==
                  true ||
                (((data?.name == "rename") == true) ===
                  workspacePermissionWs1?.rename) ==
                  true ||
                (((data?.name == "upload_folder") == true) ===
                  workspacePermissionWs1?.upload_folder) ==
                  true ||
                (((data?.name == "create_folder") == true) ===
                  workspacePermissionWs1?.create_folder) ==
                  true ||
                (((data?.name == "upload_file") == true) ===
                  workspacePermissionWs1?.upload_file) ==
                  true ||
                (((data?.name == "delete") == true) ===
                  workspacePermissionWs1?.delete_per) ==
                  true ||
                (((data?.name == "download") == true) ===
                  workspacePermissionWs1?.download_per) ==
                  true ||
                (((data?.name == "comment") == true) ===
                  workspacePermissionWs1?.comments) ==
                  true ||
                (((data?.name == "properties") == true) ===
                  workspacePermissionWs1?.properties) ==
                  true ||
                isLogin.user_type === "Admin"
              ) {
                return (
                  <Grid item key={data.label} xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={checkboxValues[data?.name]}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          style={{ fontSize: "15px" }}
                          sx={{ pl: -1 }}
                        >
                          {data.label}
                        </Typography>
                      }
                      sx={{ pl: 0.4 }}
                      style={data.style}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermission}>Cancel</Button>
          <Button
            onClick={() =>
              handleClickPermission(
                data?.id,
                data?.file_type,
                data?.file_name,
                data?.folder_name
              )
            }
            size="md"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
