import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { Button } from "../Component";

export default function WorkspacePermission({
  data,
  openDialog,
  permission,
  checkboxValues,
  PermissionEditedId,
  handleCheckboxChange,
  handleClickPermission,
  handleClosePermission,
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
      >
        <DialogTitle fontSize="17px">{title}</DialogTitle>
        <DialogContent>
          <Grid container>
            {permissionArray?.map((data) => {
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
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermission} variant="contained">
            Cancel
          </Button>
          <Button
            color="primary"
            size="md"
            onClick={() =>
              handleClickPermission(
                data?.id,
                data?.file_type,
                data?.workspace_name
              )
            }
            autoFocus
          >
            {PermissionEditedId?.id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
