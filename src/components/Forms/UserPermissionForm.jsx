import * as React from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
export default function UserPermissionForm({
  formData,
  cabinetList,
  handleSubmit,
  matchedWorkspace,
  handleAutocompleteChange,
  workspaceType,
}) {
  return (
    <Stack>
      <Card sx={{ p: 2, mb: 1 }}>
        <Grid container spacing={1} id="form">
          <Grid item xs={3.5}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="cabinet_name"
              options={cabinetList}
              renderInput={(params) => (
                <TextField {...params} label="Select Cabinet" />
              )}
              value={formData.cabinet_name}
              onChange={(event, value) =>
                handleAutocompleteChange("cabinet_name", value)
              }
            />
          </Grid>
          <Grid item xs={3.5}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="workspace_type"
              options={workspaceType
                .filter((data) => data.workspace_type === formData.workspace_type)
                .map((data) => ({ id: data.id, name: data.workspace_name }))
              }
                getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Workspace Type" />
              )}
              value={formData.workspace_type}
              onChange={(event, value) =>
                handleAutocompleteChange("workspace_type", value)
              }
            />
          </Grid>
          <Grid item xs={3.5}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="workspace_id"
              options={matchedWorkspace}
              getOptionLabel={(option) => option.workspace_name}
              renderInput={(params) => (
                <TextField {...params} label="WorkSpace Name" />
              )}
              value={formData.workspace_id || null}
              onChange={(event, value) =>
                handleAutocompleteChange("workspace_id", value || "")
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmit}
              id="submitBtn"
              style={{
                height: "38px",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
