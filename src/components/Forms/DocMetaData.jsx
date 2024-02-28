import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Stack, Button, TextField, Autocomplete } from "@mui/material";

export default function DocMetaData({
  editId,
  docList,
  openForm,
  cabinetList,
  handleChange,
  onFormSubmit,
  getWorkspaces,
  userDropdowns,
  addDocMetaData,
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
          <DialogTitle id="alert-dialog-title">{"Add Metadata"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} id="form">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  id="metadata_name"
                  margin="dense"
                  label="Metadata Name"
                  value={addDocMetaData?.metadata_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_workspace"
                  sx={{ mt: 1 }}
                  options={[...getWorkspaces, ""]}
                  renderInput={(params) => (
                    <TextField {...params} label="Workspace Name" />
                  )}
                  value={addDocMetaData?.selected_workspace}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_workspace", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_cabinet"
                  sx={{ mt: 1 }}
                  options={[...cabinetList, ""]}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Cabinet" />
                  )}
                  value={addDocMetaData?.selected_cabinet}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_cabinet", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="selected_doctype"
                  sx={{ mt: 1 }}
                  options={[...docList, ""]}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Doctype" />
                  )}
                  value={addDocMetaData?.selected_doctype}
                  onChange={(event, value) =>
                    handleAutocompleteChange("selected_doctype", value)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseForm}
              style={{
                outline: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onFormSubmit}
              style={{
                outline: "none",
              }}
            >
              {editId ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Stack>
  );
}
