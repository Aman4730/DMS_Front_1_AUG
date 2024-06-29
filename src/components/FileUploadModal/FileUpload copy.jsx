import { Button, Icon } from "../Component";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Backdrop,
  TextField,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "./FileUpload.css";
import FileUploaded from "../FileUploaded";
export default function FileUpload({
  open,
  close,
  editFileId,
  userquota,
  formValues,
  Properties,
  handleOkay,
  selectedFile,
  fileNameInput,
  handleFileChange,
  handleChangeFile,
  matchedWorkspace,
  handleInputChange,
  handleCloseFileModal,
  handleDoctypeAutocomplete,
  clearFileInput,
  doctypeName,
  inputRef,
  onChooseFile,
  progress,
  uploadStatus,
}) {
  const [propertys, setPropertys] = useState([]);
  const property = () => {
    Properties?.map((data) => {
      setPropertys(data?.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [Properties]);

  const metadata = matchedWorkspace?.map((data) => data?.doctype);
  //file

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs" //(xs, sm, md, lg, xl
      >
        <DialogTitle id="alert-dialog-title">
          {"File MetaData"}
          <a
            onClick={handleCloseFileModal}
            className="close"
            style={{ cursor: "pointer" }}
          >
            <Icon name="cross-sm"></Icon>
          </a>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="File Desc"
                name="file_description"
                value={fileNameInput.file_description}
                onChange={handleChangeFile}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                size="small"
                id="tags-outlined"
                filterSelectedOptions
                options={metadata || ""}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Selected DocType" />
                )}
                onChange={(event, value) => handleDoctypeAutocomplete(value)}
              />
              {doctypeName && (
                <Grid container spacing={1} mt={0.1} id="form">
                  {Properties?.map((data) => (
                    <React.Fragment key={data.name}>
                      <Grid item xs={4}>
                        {data.fieldtype === "Text" ? (
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type={data.fieldtype}
                            name={data.fieldname}
                            label={data.fieldname}
                            value={formValues[data.fieldname] || ""}
                            onChange={(e) =>
                              handleInputChange(e, data.fieldname)
                            }
                          />
                        ) : (
                          <Autocomplete
                            disablePortal
                            size="small"
                            id="combo-box-demo"
                            name={data.fieldname}
                            options={data.metaproperties}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={data.fieldname}
                                size="small"
                              />
                            )}
                            value={formValues[data.fieldname] || ""}
                            onChange={(e, value) =>
                              handleInputChange(value, data.fieldname)
                            }
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              )}
              {editFileId > 0 && (
                <React.Fragment>
                  <Typography variant="h6" fontSize="19px">
                    Edit File Name
                  </Typography>
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      label="File Name"
                      name="name"
                      style={{ marginRight: "5px" }}
                      value={fileNameInput.name}
                      onChange={handleChangeFile}
                    />
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

          <FileUploaded
            handleOkay={handleOkay}
            clearFileInput={clearFileInput}
            handleFileChange={handleFileChange}
            inputRef={inputRef}
            editFileId={editFileId}
            onChooseFile={onChooseFile}
            progress={progress}
            close={close}
            selectedFile={selectedFile}
            uploadStatus={uploadStatus}
          />
          {userquota >= selectedFile?.size ? (
            <React.Fragment>
              {uploadStatus === "selected" && (
                <button
                  className="upload-btn"
                  style={{ outline: "none" }}
                  onClick={handleOkay}
                >
                  {editFileId ? "Update" : "Upload"}
                </button>
              )}
              {uploadStatus === "uploading" && (
                <button
                  className="upload-btn"
                  style={{ outline: "none" }}
                  onClick={close}
                >
                  Cancel
                </button>
              )}
              {uploadStatus === "done" && (
                <button className="upload-btn" onClick={handleCloseFileModal}>
                  Done
                </button>
              )}
            </React.Fragment>
          ) :
            ""
          }
        </DialogActions>
      </Dialog>
    </>
  );
}
