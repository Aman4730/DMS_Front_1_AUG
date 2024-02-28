import * as React from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function SmtpForm({
  formData,
  editId,
  handleChange,
  handleSubmit,
  testEmailForm,
  handleTestEmail,
  handleSubmitTestEmail,
  handleAutocompleteChange,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Stack>
      <Card sx={{ p: 2, mb: 1 }}>
        <Grid container spacing={1} id="form">
          <Grid item xs={3}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              type="email"
              id="User_Name"
              margin="dense"
              label="User Name"
              value={formData?.User_Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              autoFocus
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
          <Grid item xs={3}>
            <TextField
              autoFocus
              fullWidth
              id="Server_IP"
              type="text"
              size="small"
              margin="dense"
              label="Server IP / Url"
              value={formData.Server_IP}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              autoFocus
              fullWidth
              id="Server_Port"
              size="small"
              type="text"
              margin="dense"
              label="Server Port"
              value={formData.Server_Port}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              autoFocus
              fullWidth
              type="email"
              size="small"
              margin="dense"
              id="From_Address"
              label="From Address"
              sx={{ mt: -0 }}
              value={formData.From_Address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              margin="dense"
              id="From_Name"
              label="From Name"
              sx={{ mt: -0 }}
              value={formData.From_Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Authentication"
              options={["Yes", "No"]}
              renderInput={(params) => (
                <TextField {...params} label="Authentication" />
              )}
              value={formData.Authentication}
              onChange={(event, value) =>
                handleAutocompleteChange("Authentication", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Security"
              options={["None", "SSL", "TLS", "STARTLS"]}
              renderInput={(params) => (
                <TextField {...params} label="Security" />
              )}
              value={formData.Security}
              onChange={(event, value) =>
                handleAutocompleteChange("Security", value)
              }
            />
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="end">
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                outline: "none",
              }}
              sx={{ mr: 10.5 }}
            >
              {editId ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
        Test Email
      </Typography>
      <Card sx={{ p: 2, mb: 1 }}>
        <Grid container spacing={1} id="form">
          <Grid item xs={3.5}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              type="email"
              margin="dense"
              name="To_Address"
              label="To Address"
              value={testEmailForm.To_Address}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item xs={3.5}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              name="Subject"
              margin="dense"
              label="Subject"
              value={testEmailForm.Subject}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item xs={3.5}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              margin="dense"
              name="Message"
              label="Message"
              value={testEmailForm.Message}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmitTestEmail}
              style={{
                outline: "none",
              }}
              sx={{ mt: 1.2 }}
            >
              Test Email
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
