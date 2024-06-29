import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete } from "@mui/lab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserForm = ({
  openForm,
  handleCloseForm,
  formData,
  setFormData,
  onFormSubmit,
  editId,
  groupsDropdown,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case "display_name":
        tempErrors.display_name = value ? "" : "User Name is required.";
        break;
      case "max_quota":
        tempErrors.max_quota = value ? "" : "Max Quota is required.";
        break;
      case "email":
        tempErrors.email = value ? "" : "Email is required.";
        break;
      case "emp_code":
        tempErrors.emp_code = value ? "" : "Employee Code is required.";
        break;
      case "password":
        tempErrors.password = value || editId ? "" : "Password is required.";
        break;
      case "user_role":
        tempErrors.user_role = value ? "" : "User Role is required.";
        break;
      case "user_type":
        tempErrors.user_type = value ? "" : "User Type is required.";
        break;
      case "add_group":
        tempErrors.add_group = value ? "" : "Group is required.";
        break;
      case "level_1":
        tempErrors.level_1 = value ? "" : "Workflow Level 1 is required.";
        break;
      case "level_2":
        tempErrors.level_2 = value ? "" : "Workflow Level 2 is required.";
        break;
      case "userValidity":
        tempErrors.userValidity = value ? "" : "User Validity is required.";
        break;
      default:
        break;
    }

    setErrors(tempErrors);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };

  const handleAutocompleteChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.display_name = formData.display_name
      ? ""
      : "User Name is required.";
    tempErrors.max_quota = formData.max_quota ? "" : "Max Quota is required.";
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.emp_code = formData.emp_code ? "" : "Employee Code is required.";
    tempErrors.password =
      formData.password || editId ? "" : "Password is required.";
    tempErrors.user_role = formData.user_role ? "" : "User Role is required.";
    tempErrors.user_type = formData.user_type ? "" : "User Type is required.";
    tempErrors.add_group = formData.add_group ? "" : "Group is required.";
    tempErrors.level_1 = formData.level_1
      ? ""
      : "Workflow Level 1 is required.";
    tempErrors.level_2 = formData.level_2
      ? ""
      : "Workflow Level 2 is required.";
    tempErrors.userValidity = formData.userValidity
      ? ""
      : "User Validity is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onFormSubmit();
    }
  };

  return (
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
              error={!!errors.display_name}
              helperText={errors.display_name}
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
              error={!!errors.max_quota}
              helperText={errors.max_quota}
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
              disabled={editId}
              value={formData?.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="emp_code"
              size="small"
              type="text"
              margin="dense"
              label="Employee Code"
              value={formData?.emp_code}
              onChange={handleChange}
              error={!!errors.emp_code}
              helperText={errors.emp_code}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.user_role}
              helperText={errors.user_role}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              size="small"
              id="tags-outlined"
              options={["Admin", "User"]}
              filterSelectedOptions
              sx={{ mt: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User Type"
                  error={!!errors.user_type}
                  helperText={errors.user_type}
                />
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
                <TextField
                  {...params}
                  label="Selected Groups"
                  error={!!errors.add_group}
                  helperText={errors.add_group}
                />
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
              error={!!errors.level_1}
              helperText={errors.level_1}
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
              error={!!errors.level_2}
              helperText={errors.level_2}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              name="userValidity"
              selected={formData.userValidity}
              onChange={(date) => {
                setFormData({ ...formData, userValidity: date });
                validateField("userValidity", date);
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="User Validity"
              customInput={
                <TextField
                  error={!!errors.userValidity}
                  helperText={errors.userValidity}
                  fullWidth
                  size="small"
                />
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" id="closeBtn" onClick={handleCloseForm}>
          Cancel
        </Button>
        <Button id="submitBtn" onClick={handleSubmit} color="primary" size="md">
          {editId ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
