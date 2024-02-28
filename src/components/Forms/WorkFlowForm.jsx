import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Stack, TextField, Autocomplete } from "@mui/material";
import { Button } from "../Component";

export default function WorkFlowForm({
  editId,
  openForm,
  addPolicies,
  handleChange,
  onFormSubmit,
  getWorkspaces,
  userDropdowns,
  handleCloseForm,
  handleAutocompleteChange,
}) {
  return (
    <Stack>
      <React.Fragment>
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add Policy"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} id="form">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  id="policy_name"
                  margin="dense"
                  label="Policy Name"
                  value={addPolicies?.policy_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="group_admin"
                  size="small"
                  type="text"
                  margin="dense"
                  label="Group Admin"
                  value={addPolicies?.group_admin}
                  onChange={handleChange}
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
                  sx={{ mt: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Users" />
                  )}
                  value={addPolicies?.selected_user}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_user", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="workspace_name"
                  sx={{ mt: 1 }}
                  options={[...getWorkspaces, ""]}
                  renderInput={(params) => (
                    <TextField {...params} label="Workspace Name" />
                  )}
                  value={addPolicies?.workspace_name}
                  onChange={(event, value) =>
                    handleAutocompleteChange("workspace_name", value)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={onFormSubmit} color="primary" size="md">
              {editId ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Stack>
  );
}
