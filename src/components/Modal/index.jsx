import React from "react";
import { TextField } from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  DialogActions,
} from "@mui/material";
const ModalPop = ({
  open,
  data,
  title,
  file_type,
  folderNameInput,
  type = "normal",
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleOkay = () => alert("Please add handle success function"),
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
      style={{ backgroundColor: "rgba(255,0,0,0,0.2)" }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {type == "form" && (
        <FormControl
          sx={{
            p: 3,
          }}
        >
          {inputList?.map((data, index) => (
            <TextField
              fullWidth
              key={index}
              type={data.type}
              variant="outlined"
              onChange={handleChange}
              name={data.name}
              size="small"
              value={folderNameInput.name}
              placeholder={data.placeholder}
            />
          ))}
        </FormControl>
      )}

      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            outline: "none",
          }}
        >
          {buttonCancelTitle}
        </Button>
        <Button
          onClick={() => handleOkay(data, file_type)}
          style={{
            outline: "none",
          }}
        >
          {buttonSuccessTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPop;
