import * as React from "react";
import { Button } from "../Component";
import DatePicker from "react-datepicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  Stack,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
} from "@mui/material";
export default function UserForm({
  editId,
  openForm,
  formData,
  setFormData,
  handleChange,
  onFormSubmit,
  groupsDropdown,
  handleCloseForm,
  handleAutocompleteChange,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Stack>
      <React.Fragment>
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{"Add User"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} id="form">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  id="display_name"
                  margin="dense"
                  label="User Name"
                  value={formData?.display_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="max_quota"
                  size="small"
                  type="number"
                  margin="dense"
                  label="Max Quota(Gb)"
                  value={formData?.max_quota}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="email"
                  size="small"
                  type="text"
                  margin="dense"
                  label="Email"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="emp_code"
                  size="small"
                  type="number"
                  margin="dense"
                  label="Employee Code"
                  value={formData?.emp_code}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  margin="dense"
                  label="Password"
                  value={formData?.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          style={{
                            outline: "none",
                          }}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="password"
                  size="small"
                  type="password"
                  margin="dense"
                  label="Password"
                  value={formData?.password}
                  onChange={handleChange}
                />
              </Grid> */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="user_role"
                  size="small"
                  type="text"
                  margin="dense"
                  label="User Role"
                  value={formData?.user_role}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="tags-outlined"
                  options={["Admin", "User", "Guest"]}
                  filterSelectedOptions
                  sx={{ mt: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="User Type" />
                  )}
                  value={formData?.user_type}
                  onChange={(event, value) =>
                    handleAutocompleteChange("user_type", value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="add_group"
                  options={groupsDropdown || ""}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  sx={{ mt: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Groups" />
                  )}
                  value={formData?.add_group}
                  onChange={(event, value) =>
                    handleAutocompleteChange("add_group", value)
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
              <Grid item xs={12}>
                <DatePicker
                  name="userValidity"
                  selected={formData.userValidity}
                  onChange={(e) =>
                    setFormData({ ...formData, userValidity: e })
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="User Validity"
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
