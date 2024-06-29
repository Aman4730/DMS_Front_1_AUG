import React from "react";
import { Button } from "../Component";
import { TextField } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
const GuestTSFolderCreate = ({
  id,
  open,
  title,
  input,
  addNew,
  editFolderId,
  type = "normal",
  folderNameInput,
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleClose = () => alert("Please add handle cancel function"),
  handleChange = () => alert("Please add handle change function"),
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="responsive-dialog-title">
        {editFolderId ? "Update Folder" : "Create Folder"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {type == "form" && (
            <FormControl>
              {inputList?.map((data, index) => (
                <TextField
                  fullWidth
                  key={index}
                  size="small"
                  sx={{ mt: 1 }}
                  type={data.type}
                  name={data.name}
                  variant="outlined"
                  onChange={handleChange}
                  label={data.placeholder}
                  value={folderNameInput.name}
                />
              ))}
            </FormControl>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{buttonCancelTitle}</Button>
        <Button color="primary" size="md" onClick={() => addNew(id, input)}>
          {editFolderId ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestTSFolderCreate;
