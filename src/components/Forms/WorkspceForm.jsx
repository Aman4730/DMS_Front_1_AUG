import * as React from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
export default function WorkspceForm({
  editId,
  formShow,
  formData,
  cabinetList,
  onFormCancel,
  handleChange,
  onFormSubmit,
  userDropdowns,
  groupsDropdown,
  handleAutocompleteChange,
}) {
  return (
    <Stack>
      {formShow && (
        <Card sx={{ p: 2, mb: 1 }}>
          <Grid container spacing={1} id="form">
            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                type="email"
                id="workspace_name"
                margin="dense"
                label="Workspace Name"
                value={formData?.workspace_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="enter_quota"
                size="small"
                type="number"
                margin="dense"
                label="Enter Quota(Gb)"
                value={formData?.enter_quota}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                fullWidth
                size="small"
                id="workspace_type"
                sx={{ mt: 1 }}
                options={["My Workspace", "TeamSpace"]}
                renderInput={(params) => (
                  <TextField {...params} label="Workspace Type" />
                )}
                value={formData?.workspace_type}
                onChange={(event, value) =>
                  handleAutocompleteChange("workspace_type", value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                fullWidth
                size="small"
                id="tags-outlined"
                sx={{ mt: 1 }}
                options={cabinetList || []}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Selected Cabinet" />
                )}
                value={formData?.selected_cabinet}
                onChange={(event, value) =>
                  handleAutocompleteChange("selected_cabinet", value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                multiple
                fullWidth
                size="small"
                id="tags-outlined"
                options={groupsDropdown || ""}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Selected Groups" />
                )}
                value={formData?.selected_groups}
                onChange={(event, value) =>
                  handleAutocompleteChange("selected_groups", value)
                }
              />
            </Grid>
            <Grid item xs={3}>
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
                value={formData?.selected_users}
                onChange={(event, value) =>
                  handleAutocompleteChange("selected_users", value)
                }
              />
            </Grid>
            <Grid item xs={6} justifyContent="flex-end" container>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={onFormSubmit}
                  style={{
                    outline: "none",
                    height: "37px",
                    marginRight: "3px",
                  }}
                >
                  {editId ? "Update" : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={onFormCancel}
                  style={{
                    outline: "none",
                    height: "37px",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </Stack>
  );
}
