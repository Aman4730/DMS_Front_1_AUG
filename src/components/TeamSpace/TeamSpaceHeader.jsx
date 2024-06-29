import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import {
  Icon,
  Button,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../Component";

const TeamSpaceHeader = ({
  sm,
  list,
  isLogin,
  heading,
  updateSm,
  findFolder,
  searchTerm,
  setSearchTerm,
  callApiHeader,
  openFileUpload,
  openFolderModal,
  workspacePermissionWs1,
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 15000);
    return () => clearTimeout(timeoutId);
  }, []);
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
              {heading == "true" ? <>Global Search</> : <>TeamSpace</>}
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
              {isLogin.user_type == "Admin" ? (
                <div
                  className="toggle-expand-content"
                  style={{
                    display: sm ? "block" : "none",
                    marginBottom: "-15px",
                  }}
                >
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFolderModal}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Create Folder
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFileUpload}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Upload Folder
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={openFileUpload}
                        style={{ padding: "2px 5px 2px 5px" }}
                      >
                        Upload File
                      </Button>
                    </li>
                    {open == false ? (
                      <li className="nk-block-tools-opt">
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={() => setOpen(true)}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          <SearchIcon fontSize="small" />
                        </Button>
                      </li>
                    ) : (
                      <li className="nk-block-tools-opt">
                        <SearchBar
                          handleClick={() => setModal({ add: true })}
                          searchButton="true"
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <div
                  className="toggle-expand-content"
                  style={{
                    display: sm ? "block" : "none",
                    marginBottom: "-15px",
                  }}
                >
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      {workspacePermissionWs1?.create_folder ? (
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={openFolderModal}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          Create Folder
                        </Button>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="nk-block-tools-opt">
                      {workspacePermissionWs1?.upload_folder ? (
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={openFileUpload}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          Upload Folder
                        </Button>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="nk-block-tools-opt">
                      {workspacePermissionWs1?.upload_file ? (
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={openFileUpload}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          Upload File
                        </Button>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </div>
              )}
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

export default TeamSpaceHeader;
