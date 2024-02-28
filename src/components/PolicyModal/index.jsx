import * as React from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, Icon, RSelect } from "../Component";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Cancel, Delete, Edit } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PolicyModal({
  open,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  title8,
  editId,
  email,
  addTask,
  Policies,
  password,
  version,
  BandWidth,
  recyclebin,
  linkSharing,
  addPolicies,
  versionfield,
  onFormSubmit,
  userDropdowns,
  editExtension,
  groupsDropdown,
  setAddPolicies,
  checkboxValues,
  onClickaddTask,
  recyclebinfield,
  handleShareData,
  handleCheckboxChange,
  handleAutocompleteChange,
  type = "normal",
  saveEdit,
  editedTask,
  editingIndex,
  handleInputChange,
  removeTask,
  startEditing,
  cancelEdit,
  tasks,
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleClose = () => alert("Please add handle cancel function"),
  handleOkay = () => alert("Please add handle success function"),
  handleChange = () => alert("Please add handle change function"),
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ mr: 1, mb: -2, mt: -1 }}>{title}</DialogTitle>
        <DialogContent>
          {type === "form" && (
            <FormControl>
              <Grid container spacing={1} sx={{ mt: 0.1 }}>
                <Grid
                  container
                  spacing={1}
                  sx={{ mt: 0.1 }}
                  style={{ width: "550px", height: "auto" }} // Changed height to auto
                >
                  {/* Policies */}
                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      options={["MyWorkspace", "TeamSpace"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Type" />
                      )}
                      value={addPolicies?.policy_type}
                      onChange={(e, newValue) =>
                        setAddPolicies({
                          ...addPolicies,
                          policy_type: newValue,
                        })
                      }
                    />
                  </Grid>
                  {Policies?.map((data, index) => (
                    <Grid item xs={6} key={index}>
                      <TextField
                        fullWidth
                        size="small"
                        type={data.type}
                        name={data.name}
                        variant="outlined"
                        defaultValue={addPolicies[data.name]}
                        onChange={handleShareData}
                        value={addPolicies.name}
                        label={data.placeholder}
                        inputProps={{
                          style: {
                            padding: "7px",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={6}>
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
                      value={addPolicies?.selected_user}
                      onChange={(event, value) =>
                        handleAutocompleteChange("selected_user", value)
                      }
                      style={{ maxHeight: 70, overflowY: "auto" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      multiple
                      fullWidth
                      size="small"
                      id="tags-outlined"
                      filterSelectedOptions
                      options={groupsDropdown || ""}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Groups" />
                      )}
                      sx={{ mb: 1 }}
                      value={addPolicies?.selected_group}
                      onChange={(event, value) =>
                        handleAutocompleteChange("selected_group", value)
                      }
                    />
                  </Grid>
                </Grid>
                {addPolicies.policy_type == "TeamSpace" ? (
                  <>
                    {/* Password Setting */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title1}
                      </DialogTitle>
                    </Grid>
                    {inputList?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {password?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        placeholder={
                          editingIndex === null
                            ? "Enter File Extension"
                            : "Edit File Extension"
                        }
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          editingIndex === null
                            ? addTask
                            : () => saveEdit(editingIndex)
                        }
                        style={{ marginRight: "3px" }}
                      >
                        {editingIndex === null ? "Add" : "Edit"}
                      </Button>
                      {editingIndex !== null && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={cancelEdit}
                        >
                          <Cancel />
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      border="1px solid grey"
                      ml={1.2}
                      mt={1}
                    >
                      {editExtension.map((task, index) => (
                        <Grid item xs={2.9} key={index} flexDirection="row">
                          <Stack flexDirection="row">
                            {task}
                            <Tooltip
                              title="Edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => startEditing(index, task)}
                            >
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    {/* Link Expiry */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title3}
                      </DialogTitle>
                    </Grid>
                    {linkSharing?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* Email */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title4}
                      </DialogTitle>
                    </Grid>
                    {email?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data) => (
                      <>
                        <Grid item key={data.label}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.recycle_bin == true ? (
                      <>
                        {recyclebinfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>

                    {version?.map((data) => (
                      <>
                        <Grid item key={data.label}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues.versions == true ? (
                      <>
                        {versionfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "5px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                {/* ------------------------------------------------ */}
                {addPolicies.policy_type == "MyWorkspace" ? (
                  <>
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        placeholder={
                          editingIndex === null
                            ? "Enter File Extension"
                            : "Edit File Extension"
                        }
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          editingIndex === null
                            ? addTask
                            : () => saveEdit(editingIndex)
                        }
                        style={{ marginRight: "3px" }}
                      >
                        {editingIndex === null ? "Add" : "Edit"}
                      </Button>
                      {editingIndex !== null && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={cancelEdit}
                        >
                          <Cancel />
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      border="1px solid grey"
                      ml={1.2}
                      mt={1}
                    >
                      {editExtension.map((task, index) => (
                        <Grid item xs={2.9} key={index} flexDirection="row">
                          <Stack flexDirection="row">
                            {task}
                            <Tooltip
                              title="Edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => startEditing(index, task)}
                            >
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* recyclebin */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data) => (
                      <>
                        <Grid item key={data.label}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.recycle_bin == true ? (
                      <>
                        {recyclebinfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {/* version */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>
                    {version?.map((data) => (
                      <>
                        <Grid item key={data.label}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.versions == true ? (
                      <>
                        {versionfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "5px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "block", marginLeft: "15px" }}>
          <Button color="primary" onClick={onFormSubmit}>
            {buttonSuccessTitle}
          </Button>
          <Button onClick={handleClose}>{buttonCancelTitle}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
