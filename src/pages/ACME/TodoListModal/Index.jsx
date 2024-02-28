import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { Icon } from "../../../components/Component";

export default function TodoListModal({
  open,
  handleClose = () => alert("Please add handle cancel function"),
  title,
  handleOkay = () => alert("Please add handle success function"),
  handleClickOpenModal,
  type = "normal",
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
  handleChange = () => alert("Please add handle change function"),
  folderNameInput,
}) {
  return (
    <div>
      <>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Properties MetaData"}</DialogTitle>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 20px 15px 20px",
            }}
          >
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              name="name"
              size="small"
              placeholder="Enter Properties Name"
              style={{
                margin: "0px 4px 8px 0px",
              }}
              //   onChange={PropertyName}
            />
            <Button
              variant="contained"
              style={{ height: "40px" }}
              //   onClick={onClickaddTask}
            >
              <Icon name="plus"></Icon>
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
            {addTask.map((ele, index) => {
              return (
                <>
                  <Stack
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "10px",
                      padding: "0px 5px 0px 24px",
                    }}
                  >
                    <Stack
                      style={{
                        width: "222px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {ele}
                    </Stack>
                    <Button
                      onClick={() => removeHandler(index)}
                      className="btn-icon"
                      variant="outlined"
                      style={{
                        padding: "1px 2px 1px 2px",
                        width: "25%",
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </>
              );
            })}
          </Grid> */}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
