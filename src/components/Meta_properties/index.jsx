import React, { useState } from "react";
import { Modal, ModalBody, Form } from "reactstrap";
import { Icon } from "../Component";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Grid,
  Stack,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const index = ({
  modal,
  editId,
  handleSubmit,
  onSubmitProperties,
  autocomplete,
  propertyDropdown,
  FieldNameInput,
  PropertyName,
  onFormCancel,
  onClickaddTask,
  addTask,
  removeHandler,
  getProperties,
  toggle,
  title,
  onBlockClick,
  setSwitchValues,
  switchValues,
  handleSwitchChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useMemo(() => {
    if (propertyDropdown == "List") {
      handleClickOpen();
    }
  }, [propertyDropdown]);

  return (
    <Modal
      isOpen={modal.metaedit}
      toggle={toggle}
      className="modal-dialog-centered"
      size="lg"
      style={{ width: "600px" }}
    >
      <ModalBody>
        <a
          href="#close"
          onClick={(ev) => {
            ev.preventDefault();
            onFormCancel();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">
            {editId ? "Manage Metadata" : "Metadata Properties"}({title})
          </h5>
          <div className="mt-4">
            <Form
              className="row gy-4"
              noValidate
              onSubmit={handleSubmit(onSubmitProperties)}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ p: 5 }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Grid item xs={5}>
                    <TextField
                      label="Field Name"
                      fullWidth
                      size="small"
                      onChange={FieldNameInput}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      freeSolo
                      fullWidth
                      size="small"
                      options={[
                        "Text",
                        "List",
                        "Date",
                        "Numeric",
                        "AlphaNumeric",
                      ]}
                      renderInput={(params) => (
                        <TextField {...params} label="Field Type" fullWidth />
                      )}
                      onChange={autocomplete}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ height: "40px" }}
                      onClick={handleClickOpen}
                    >
                      <Icon name="plus"></Icon>
                    </Button>
                  </Grid>
                  {propertyDropdown == "List" ? (
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
                            onChange={PropertyName}
                            name="name"
                            size="small"
                            placeholder="Enter Properties Name"
                            style={{
                              margin: "0px 4px 8px 0px",
                            }}
                          />
                          <Button
                            variant="contained"
                            style={{ height: "40px" }}
                            onClick={onClickaddTask}
                          >
                            <Icon name="plus"></Icon>
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Add</Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ) : (
                    ""
                  )}
                  <Grid item xs={12}>
                    {getProperties.map((item, index) => {
                      return (
                        <>
                          <Stack
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "10px",
                              borderBottom: "1px solid black",
                            }}
                          >
                            <Stack
                              style={{
                                width: "25vw",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              {item.fieldname}
                              <Stack>{item.fieldtype}</Stack>
                            </Stack>
                            <EditIcon sx={{ ml: 20 }} />
                            <ul className="nk-tb-actions">
                              <li>
                                <Switch
                                  size="small"
                                  checked={
                                    item?.meta_status == "true" ? true : false
                                  }
                                  onChange={(event) =>
                                    onBlockClick(
                                      item.id,
                                      item?.meta_status != "true"
                                        ? "true"
                                        : "false"
                                    )
                                  }
                                  inputProps={{ "aria-label": "Toggle switch" }}
                                />
                                {/* <Switch
                                  checked={
                                    item.meta_status == "true" ? true : false
                                  }
                                  size="small"
                                  onChange={(event) =>
                                    onBlockClick(item.id, event.target.checked)
                                  }
                                /> */}
                              </li>
                            </ul>
                          </Stack>
                        </>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" size="md" type="submit">
                      {editId ? "Update Properties" : "Add Properties"}
                    </Button>
                    <a
                      style={{ marginLeft: "20px" }}
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        onFormCancel();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default index;
