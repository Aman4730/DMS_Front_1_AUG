import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  Stack,
  TextField,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";

export default function WorkFlowForm({
  access,
  editId,
  openForm,
  addPolicies,
  cabinetList,
  handleChange,
  onFormSubmit,
  getWorkspaces,
  userDropdowns,
  checkboxValues,
  groupDropdowns,
  handleCloseForm,
  handleCheckboxChange,
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
            <Grid container spacing={1} id="form" mt={0.1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  id="policy_name"
                  label="Policy Name"
                  value={addPolicies?.policy_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_cabinet"
                  options={(cabinetList || []).sort((a, b) =>
                    a.localeCompare(b)
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Cabinet" />
                  )}
                  value={addPolicies.selected_cabinet || null}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_cabinet", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="workspace_type"
                  options={["My Workspace", "TeamSpace", "Data Room"]}
                  renderInput={(params) => (
                    <TextField {...params} label="workspace_type" />
                  )}
                  value={addPolicies.workspace_type || null}
                  onChange={(event, value) => {
                    const matchedWorkspace = getWorkspaces?.filter(
                      (data) => data.workspace_type === value
                    );
                    if (!matchedWorkspace || matchedWorkspace.length === 0) {
                      handleAutocompleteChange("workspace_name", null);
                    }
                    handleAutocompleteChange("workspace_type", value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="workspace_name"
                  options={getWorkspaces
                    .filter(
                      (data) =>
                        data.workspace_type === addPolicies.workspace_type
                    )
                    .map((data) => ({ id: data.id, name: data.workspace_name }))
                    .sort((a, b) => a.name.localeCompare(b.name))}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Workspace Name" />
                  )}
                  value={addPolicies?.workspace_name || null}
                  onChange={(event, value) =>
                    handleAutocompleteChange("workspace_name", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_group"
                  options={groupDropdowns
                    .map((data) => data.group_name)
                    .sort((a, b) => a.localeCompare(b))}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Group" />
                  )}
                  value={addPolicies.selected_group || null}
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
                  options={(userDropdowns || []) .sort((a, b) => a.localeCompare(b))}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Users" />
                  )}
                  value={addPolicies?.selected_user || null}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_user", value)
                  }
                />
              </Grid>
              {access.map((data) => (
                <Grid item xs={2} key={data.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={data?.name}
                        checked={checkboxValues[data?.name]}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Typography variant="body2" style={{ fontSize: "14px" }}>
                        {data.label}
                      </Typography>
                    }
                    sx={{ width: "100%", mb: -1.3 }}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button id="closeBtn" variant="outlined" onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button
              id="submitBtn"
              onClick={onFormSubmit}
              color="primary"
              size="md"
            >
              {editId ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Stack>
  );
}
