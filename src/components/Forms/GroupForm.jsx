import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

export default function GroupForm({
  editId,
  openForm,
  formData,
  handleChange,
  onFormSubmit,
  groupsDropdown,
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
          <DialogTitle>{"Add Group"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} id="form">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  id="group_name"
                  margin="dense"
                  label="Group Name"
                  value={formData?.group_name}
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
                  value={formData?.group_admin}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_user"
                  options={(groupsDropdown || []).sort((a, b) => a.localeCompare(b))}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  sx={{ mt: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected User" />
                  )}
                  value={formData?.selected_user}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_user", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="level_1"
                  size="small"
                  type="text"
                  margin="dense"
                  label="Workflow Level 1"
                  value={formData?.level_1}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="level_2"
                  size="small"
                  type="text"
                  margin="dense"
                  label="Workflow Level 2"
                  value={formData?.level_2}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" id="closeBtn" onClick={handleCloseForm}>Cancel</Button>
            <Button id="submitBtn" onClick={onFormSubmit} color="primary" size="md">
              {editId ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Stack>
  );
}
