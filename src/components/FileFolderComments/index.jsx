import React from "react";
import Dialog from "@mui/material/Dialog";
import Head from "../../layout/head/Head";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "../../../src/components/Component";
import { Card, Grid, Stack, Tooltip } from "@mui/material";
function FileFolderComments({
  notes,
  addTask,
  openCommets,
  addProperty,
  onNotesSubmit,
  setAddProperty,
  handleCloseCommets,
  onDeleteClickComment,
}) {
  return (
    <React.Fragment>
      <Dialog open={openCommets.status} onClose={handleCloseCommets}>
        <DialogTitle>Add Comments</DialogTitle>
        <DialogContent>
          <Stack flexDirection="row">
            <Stack flexDirection="column">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                value={addProperty.notes}
                onChange={(e) =>
                  setAddProperty({
                    ...addProperty,
                    notes: e.target.value,
                  })
                }
              />
              <Stack flexDirection="row">
                <Button
                  color="primary"
                  onClick={() => {
                    addTask();
                    onNotesSubmit();
                  }}
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    height: "31px",
                    margin: "5px 0px 0px 2px",
                    background: "#6576FF",
                    padding: "15px 15px 18px 15px",
                  }}
                >
                  <SearchIcon style={{ color: "white" }} />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <Grid
          item
          xs={12}
          style={{
            overflowY: "auto",
            maxHeight: "195px",
          }}
        >
          {notes?.map((ele, index) => {
            const originalTimestamp = ele.updatedAt;
            const originalDate = new Date(originalTimestamp);
            const options = {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            };
            const convertedTimestamp = originalDate.toLocaleString(
              "en-US",
              options
            );
            return (
              <React.Fragment key={index}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  sx={{ p: 1, m: 1 }}
                >
                  <Stack>
                    <Stack>Comment : {ele.notes_description}</Stack>
                    <Stack>Created Date : {convertedTimestamp}</Stack>
                    <Stack>Created By : {ele.created_by}</Stack>
                  </Stack>
                  <Tooltip
                    title="Delete"
                    onClick={() => onDeleteClickComment(ele.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <DeleteIcon size="small" />
                  </Tooltip>
                </Card>
              </React.Fragment>
            );
          })}
        </Grid>
        <DialogActions>
          <Button color="primary" onClick={handleCloseCommets}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default FileFolderComments;
