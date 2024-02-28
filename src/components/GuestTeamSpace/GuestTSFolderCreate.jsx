import React from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
} from "@mui/material";
import { TextField } from "@mui/material";
const GuestTSFolderCreate = ({
  open,
  handleClose = () => alert("Please add handle cancel function"),
  title,
  handleOkay = () => alert("Please add handle success function"),
  data,
  addNew,
  id,
  input,
  type = "normal",
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
  handleChange = () => alert("Please add handle change function"),
  folderNameInput,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ backgroundColor: "rgba(255,0,0,0,0.2)" }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {type == "form" && (
        <FormControl
          sx={{
            pr: 3,
            pl: 3,
          }}
        >
          {inputList?.map((data) => (
            <TextField
              fullWidth
              type={data.type}
              variant="outlined"
              onChange={handleChange}
              name={data.name}
              size="small"
              value={folderNameInput.name}
              label={data.placeholder}
            />
          ))}
        </FormControl>
      )}

      <DialogActions>
        <Button onClick={handleClose}>{buttonCancelTitle}</Button>
        <Button onClick={() => addNew(id, input)}>{buttonSuccessTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestTSFolderCreate;
