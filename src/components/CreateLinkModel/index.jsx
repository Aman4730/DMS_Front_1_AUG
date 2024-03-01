import React from "react";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Stack,
  Checkbox,
  Typography,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";
export default function CreateLinkModel({
  error,
  openLink,
  teamSpace,
  selectedDate,
  shareFormData,
  userDropdowns,
  checkboxValues,
  accesscheckbox,
  handleShareData,
  handleLinkClose,
  handleDateChange,
  handleCheckboxChange,
  handleSubmitShareData,
}) {
  return (
    <Stack padding={2}>
      <Dialog open={openLink} onClose={handleLinkClose}>
        <DialogTitle>Share File/Folder</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} rowSpacing={-1} id="form">
            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                size="small"
                id="tags-outlined"
                options={["User", "Guest"]}
                filterSelectedOptions
                sx={{ mt: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Selected Type" />
                )}
                value={shareFormData.Type}
                onChange={(e, newValue) =>
                  handleShareData({ target: { name: "Type", value: newValue } })
                }
              />
            </Grid>
            {shareFormData.Type == "User" ? (
              <>
                <Grid item xs={6}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={userDropdowns}
                    getOptionLabel={(user) => user.email}
                    filterSelectedOptions
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Selected User" />
                    )}
                    value={shareFormData.userDropdowns || null}
                    onChange={(e, newValue) =>
                      handleShareData({
                        target: { name: "userDropdowns", value: newValue },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={teamSpace}
                    getOptionLabel={(user) => user}
                    filterSelectedOptions
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Selected User" />
                    )}
                    value={shareFormData.workspace_name || null}
                    onChange={(e, newValue) =>
                      handleShareData({
                        target: { name: "workspace_name", value: newValue },
                      })
                    }
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    type="email"
                    name="Email"
                    margin="dense"
                    label="Enter Your Email"
                    value={shareFormData?.Email}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={error ? error : ""}
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Password"
                    label="Enter Your Password"
                    helperText={error ? "Incorrect Entry." : ""}
                    value={shareFormData.Password}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Subject"
                    label="Email Subject"
                    value={shareFormData.Subject}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Message"
                    label="Email Message"
                    value={shareFormData.Message}
                    onChange={handleShareData}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} mt={1}>
              <DatePicker
                name="userValidity"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Link Expiry"
              />
            </Grid>
            <Grid container columnSpacing={1} pt={1}>
              {accesscheckbox?.map((data) => (
                <Grid item key={data.label}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={data.name}
                        checked={checkboxValues[data.name] || false}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Typography variant="body2" style={{ fontSize: "15px" }}>
                        {data.label}
                      </Typography>
                    }
                    sx={{ pl: 0.4, mb: -4 }}
                    style={data.style}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleLinkClose}>Cancel</Button>
          <Button onClick={handleSubmitShareData}>Share</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
