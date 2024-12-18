import * as React from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@atlaskit/datetime-picker";
import SelectBox from "../SelectBox";
export default function WorkspceForm({
  editId,
  formShow,
  formData,
  cabinetList,
  setFormData,
  onFormCancel,
  handleChange,
  onFormSubmit,
  userDropdowns,
  groupsDropdown,
  subAdminsUserList,
  handlemultiSelectChange,
  handleAutocompleteChange,
}) {
  return (
    <Stack>
      {formShow && (
        <Card sx={{ p: 2, mb: 1 }}>
          <Grid container spacing={1} id="form">
            <Grid item lg={3} sm={3} xs={12}>
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
            <Grid item lg={3} sm={3} xs={12}>
              <Autocomplete
                fullWidth
                size="small"
                id="workspace_type"
                sx={{ mt: 1 }}
                options={["My Workspace", "TeamSpace", "Data Room"]}
                renderInput={(params) => (
                  <TextField {...params} label="Workspace Type" />
                )}
                value={formData?.workspace_type}
                onChange={(event, value) =>
                  handleAutocompleteChange("workspace_type", value)
                }
              />
            </Grid>
            <Grid item lg={3} sm={3} xs={12}>
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
            <Grid item lg={3} sm={3} xs={12}>
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
            <Grid item lg={3} sm={3} xs={12}>
              <SelectBox
                id="selected_groups"
                label="Select Groups"
                items={(groupsDropdown || []).sort((a, b) =>
                  a.localeCompare(b)
                )}
                handleChange={handlemultiSelectChange}
                selectedItems={formData.selected_groups || []}
              />
            </Grid>
            <Grid item lg={3} sm={3} xs={12}>
              <SelectBox
                id="select_sub_admin"
                label="Select Sub Admin"
                items={(userDropdowns || []).sort((a, b) => a.localeCompare(b))}
                handleChange={handlemultiSelectChange}
                selectedItems={formData?.select_sub_admin || []}
              />
            </Grid>
            <Grid item lg={3} sm={3} xs={12}>
              <SelectBox
                id="selected_users"
                label="Select User"
                items={(subAdminsUserList || []).sort((a, b) =>
                  a.localeCompare(b)
                )}
                handleChange={handlemultiSelectChange}
                selectedItems={formData?.selected_users || []}
              />
            </Grid>
            {formData?.workspace_type === "Data Room" && (
              <React.Fragment>
                <Grid item lg={3} sm={3} xs={12} border="1px solid red">
                  <DatePicker
                    name="startDate"
                    selected={formData.startDate}
                    onChange={(e) => {
                      setFormData({ ...formData, startDate: e });
                    }}
                    dateFormat="DD/MM/YYYY"
                    placeholder="Start Date"
                    defaultValue={formData?.startDate}
                    customInput={<TextField fullWidth size="small" />}
                  />
                </Grid>
                <Grid item lg={3} sm={3} xs={12}>
                  <DatePicker
                    name="endDate"
                    selected={formData.endDate}
                    onChange={(e) => {
                      setFormData({ ...formData, endDate: e });
                    }}
                    dateFormat="DD/MM/YYYY"
                    placeholder="End Date"
                    defaultValue={formData?.endDate}
                    customInput={<TextField fullWidth size="small" />}
                  />
                </Grid>
              </React.Fragment>
            )}
            <Grid item mt={1}>
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
        </Card>
      )}
    </Stack>
  );
}
