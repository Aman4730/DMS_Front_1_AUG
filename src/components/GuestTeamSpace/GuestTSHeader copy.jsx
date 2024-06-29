import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Icon,
  Button,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../Component";

const GuestTSHeader = ({
  sm,
  list,
  updateSm,
  findFolder,
  callApiHeader,
  openFileUpload,
  openFolderModal,
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  useEffect(() => {
    // After 5 seconds, set open to false
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 15000);
    // Clean up the timeout when the component unmounts or when open changes
    return () => clearTimeout(timeoutId);
  }, []);
  let permission = localStorage.getItem("permission");
  let permissionObject = JSON?.parse(permission);
  return (
    <Stack>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <Typography
              style={{
                fontSize: "24.5px",
                fontWeight: "bold",
              }}
            >
              Guest TeamSpace
            </Typography>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <Button
                className={`btn-icon btn-trigger toggle-expand mr-n1 ${
                  sm ? "active" : ""
                }`}
                onClick={() => updateSm(!sm)}
              >
                <Icon name="menu-alt-r"></Icon>
              </Button>
              <div
                className="toggle-expand-content"
                style={{
                  display: sm ? "block" : "none",
                  marginBottom: "-15px",
                }}
              >
                <ul className="nk-block-tools g-3">
                  <li className="nk-block-tools-opt">
                    {permissionObject?.create_folder && (
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFolderModal}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Create Folder
                      </Button>
                    )}
                  </li>
                  <li className="nk-block-tools-opt">
                    {permissionObject?.upload_folder && (
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFileUpload}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Upload Folder
                      </Button>
                    )}
                  </li>
                  <li className="nk-block-tools-opt">
                    {permissionObject?.upload_file && (
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFileUpload}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Upload File
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <div
        style={{
          display: "flex",
          margin: "-15px 0px 3px 0px",
          fontSize: "16px",
        }}
      >
        {list?.map((data, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => callApiHeader({ ...data, index })}
          >
            {data?.folder_name ? (
              <p onClick={() => findFolder(data)} style={{ cursor: "pointer" }}>
                {data?.folder_name} /
              </p>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default GuestTSHeader;
