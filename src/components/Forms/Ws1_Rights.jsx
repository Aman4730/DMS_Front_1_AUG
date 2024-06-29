import * as React from "react";
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
  Button,
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
  handleCheckboxWs1,
  handleClickPermission,
  getAllfolderPermission,
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
        maxWidth="sm"
      >
        <DialogTitle fontSize="17px">{title}</DialogTitle>
        <DialogContent>
          <Grid container id="form">
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
                      <TextField {...params} label="Select Group" />
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
                      <TextField {...params} label="Select Users" />
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
                (data.name == "view") &&
                 ( workspacePermissionWs1.view == true || getAllfolderPermission.view==true)||
                  (data.name == "move") &&
                 ( workspacePermissionWs1.move == true || getAllfolderPermission.move==true)||
                  (data.name == "share") &&
                 ( workspacePermissionWs1.share == true || getAllfolderPermission.share==true)||
                  (data.name == "rights") &&
                 ( workspacePermissionWs1.rights == true || getAllfolderPermission.rights==true)||
                  (data.name == "rename") &&
                 ( workspacePermissionWs1.rename == true || getAllfolderPermission.rename==true)||
                  (data.name == "delete") &&
                 ( workspacePermissionWs1.delete_per == true || getAllfolderPermission.delete_per==true)||
                  (data.name == "comment") &&
                 ( workspacePermissionWs1.comments == true || getAllfolderPermission.comments==true)||
                 (data.name == "download") &&
                 ( workspacePermissionWs1.download_per == true || getAllfolderPermission.download_per==true)||
                 (data.name == "properties") &&
                 ( workspacePermissionWs1.properties == true || getAllfolderPermission.properties==true)||
                 (data.name == "upload_folder") &&
                 ( workspacePermissionWs1.upload_folder == true || getAllfolderPermission.upload_folder==true)||
                 (data.name == "create_folder") &&
                 ( workspacePermissionWs1.create_folder == true || getAllfolderPermission.create_folder==true)||
                 (data.name == "upload_file") &&
                 ( workspacePermissionWs1.upload_file == true || getAllfolderPermission.upload_file==true)||
                 isLogin.user_type === "Admin"
                ){
                return (
                  <Grid item key={data.label} xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={checkboxValues[data?.name]}
                          onChange={handleCheckboxWs1}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          style={{ fontSize: "14px" }}
                        >
                          {data.label}
                        </Typography>
                      }
                      sx={{ width: "100%", mb: -1.3 }}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            id="closeBtn"
            variant="outlined"
            onClick={handleClosePermission}
          >
            Cancel
          </Button>
          <Button
            id="submitBtn"
            onClick={() =>
              handleClickPermission(
                data?.id,
                data?.file_type,
                data?.file_name,
                data?.folder_name
              )
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
