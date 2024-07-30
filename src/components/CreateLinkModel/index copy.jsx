import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@atlaskit/datetime-picker";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Checkbox,
  Typography,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";

export default function CreateLinkModel({
  error,
  isLogin,
  maxDate,
  minDate,
  openLink,
  teamSpace,
  errorMessage,
  selectedDate,
  shareFormData,
  guestFromshow,
  userDropdowns,
  checkboxValues,
  accesscheckbox,
  handleShareData,
  handleLinkClose,
  handleDateChange,
  handleCheckboxChange,
  handleSubmitShareData,
  workspacePermissionWs1,
  getAllfolderPermission,
}) {
  return (
    <React.Fragment>
      <Dialog open={openLink} onClose={handleLinkClose}>
        <DialogTitle>Share File/Folder</DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={-1} columnSpacing={1}>
            {guestFromshow === "true" ? (
              <Grid item lg={6} sm={6} xs={12}>
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
                    handleShareData({
                      target: { name: "Type", value: newValue },
                    })
                  }
                />
              </Grid>
            ) : (
              ""
            )}
            {shareFormData?.Type == "Guest" ? (
              <React.Fragment>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="Email"
                    margin="dense"
                    label="Enter Your Email"
                    value={shareFormData?.Email}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    error={error}
                    fullWidth
                    type="text"
                    size="small"
                    margin="dense"
                    name="Password"
                    label="Enter Your Password"
                    helperText={error ? errorMessage : ""}
                    value={shareFormData.Password}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    margin="dense"
                    name="Subject"
                    label="Email Subject"
                    value={shareFormData.Subject}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    margin="dense"
                    name="Message"
                    label="Email Message"
                    value={shareFormData.Message}
                    onChange={handleShareData}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item lg={6} sm={6} xs={12}>
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
                <Grid item lg={6} sm={6} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={teamSpace}
                    getOptionLabel={(user) => user}
                    filterSelectedOptions
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workspace Name" />
                    )}
                    value={shareFormData.workspace_name || null}
                    onChange={(e, newValue) =>
                      handleShareData({
                        target: { name: "workspace_name", value: newValue },
                      })
                    }
                  />
                </Grid>
              </React.Fragment>
            )}
            <Grid item lg={6} sm={6} xs={12} mt={1}>
              {isLogin?.user_type === "User" ? (
                <DatePicker
                  minDate={minDate}
                  maxDate={maxDate}
                  name="userValidity"
                  value={selectedDate || minDate}
                  defaultValue={minDate}
                  onChange={handleDateChange}
                  placeholder="Link Expiry"
                  dateFormat="DD-MM-YYYY"
                  selectProps={{ inputId: "datepicker-disabled-range" }}
                />
              ) : (
                <DatePicker
                  name="userValidity"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  placeholder="Link Expiry"
                  dateFormat="DD-MM-YYYY"
                  selectProps={{ inputId: "datepicker-disabled-range" }}
                />
              )}
            </Grid>
            <Grid container  mt={1} ml={1}>
              {accesscheckbox?.map((data) => {
                if (
                  (data.name == "view" &&
                    (workspacePermissionWs1?.view == true ||
                      getAllfolderPermission?.view == true)) ||
                  (data.name == "move" &&
                    (workspacePermissionWs1?.move == true ||
                      getAllfolderPermission?.move == true)) ||
                  (data.name == "share" &&
                    (workspacePermissionWs1?.share == true ||
                      getAllfolderPermission?.share == true)) ||
                  (data.name == "rights" &&
                    (workspacePermissionWs1?.rights == true ||
                      getAllfolderPermission?.rights == true)) ||
                  (data.name == "rename" &&
                    (workspacePermissionWs1?.rename == true ||
                      getAllfolderPermission?.rename == true)) ||
                  (data.name == "delete" &&
                    (workspacePermissionWs1?.delete_per == true ||
                      getAllfolderPermission?.delete_per == true)) ||
                  (data.name == "comment" &&
                    (workspacePermissionWs1?.comments == true ||
                      getAllfolderPermission?.comments == true)) ||
                  (data.name == "download" &&
                    (workspacePermissionWs1?.download_per == true ||
                      getAllfolderPermission?.download_per == true)) ||
                  (data.name == "properties" &&
                    (workspacePermissionWs1?.properties == true ||
                      getAllfolderPermission?.properties == true)) ||
                  (data.name == "upload_folder" &&
                    (workspacePermissionWs1?.upload_folder == true ||
                      getAllfolderPermission?.upload_folder == true)) ||
                  (data.name == "create_folder" &&
                    (workspacePermissionWs1?.create_folder == true ||
                      getAllfolderPermission?.create_folder == true)) ||
                  (data.name == "upload_file" &&
                    (workspacePermissionWs1?.upload_file == true ||
                      getAllfolderPermission?.upload_file == true)) ||
                  (data.name == "view_watermark" &&
                    (workspacePermissionWs1.view_watermark == true ||
                      getAllfolderPermission.view_watermark == true)) ||
                  (data.name == "download_watermark" &&
                    (workspacePermissionWs1.download_watermark == true ||
                      getAllfolderPermission.download_watermark == true)) ||
                  isLogin?.user_type === "Admin"
                ) {
                  return (
                    <Grid item key={data.label} lg={3} sm={3} xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={data.name}
                            checked={checkboxValues[data.name] || false}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            style={{ fontSize: "14px" }}
                          >
                            {data.label}
                          </Typography>
                        }
                        sx={{ width: "100%", mb: -1.3 }}
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" id="closeBtn" onClick={handleLinkClose}>
            Cancel
          </Button>
          <Button id="submitBtn" onClick={handleSubmitShareData}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
