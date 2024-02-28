import React, { useState } from "react";
import {
  Block,
  Icon,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
} from "../Component";
import Content from "../../layout/content/Content";
import { Stack, Typography } from "@mui/material";

const Foldertable = () => {
  const [tablesm, updateTableSm] = useState(false);
  const [sm, updateSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
  });
  const toggle = () => setonSearch(!onSearch);
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  return (
    <Content>
      <Stack style={{ marginTop: "-19px" }}>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                Folders
              </Typography>
              <BlockDes className="text-soft">
                {/* <p>You have total {totalUsers} Files.</p> */}
              </BlockDes>
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
                    marginRight: "-160px",
                  }}
                >
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={() => setModal({ add: true })}
                        style={{ padding: "1px 4px 1px 4px" }}
                      >
                        Create Folder
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        style={{ padding: "1px 6px 1px 6px", width: "50%" }}
                      >
                        {/* <Icon name="plus"></Icon> */}
                        <input type="file" />
                        Upload
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Stack>

      <Block>
        <DataTable className="card-stretch">
          <div
            className="card-inner position-relative card-tools-toggle"
            style={{ height: "2px" }}
          >
            <div className="card-title-group">
              <div className="card-tools mr-n1">
                <ul className="btn-toolbar gx-1">
                  <li>
                    <a
                      href="#search"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                      className="btn btn-icon search-toggle toggle-search"
                    >
                      <Icon name="search" style={{ marginTop: "-25px" }}></Icon>
                    </a>
                  </li>
                  <li>
                    <div className="toggle-wrap">
                      <div
                        className={`toggle-content ${
                          tablesm ? "content-active" : ""
                        }`}
                      >
                        <ul className="btn-toolbar gx-1">
                          <li className="toggle-close">
                            <Button
                              className="btn-icon btn-trigger toggle"
                              onClick={() => updateTableSm(false)}
                            >
                              <Icon name="arrow-left"></Icon>
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`card-search search-wrap ${!onSearch && "active"}`}>
              <div classNaonSearchTextme="card-body">
                <div className="search-content">
                  <Button
                    className="search-back btn-icon toggle-search active"
                    onClick={() => {
                      setSearchText("");
                      toggle();
                    }}
                  >
                    <Icon name="arrow-left"></Icon>
                  </Button>
                  <input
                    type="text"
                    className="border-transparent form-focus-none form-control"
                    placeholder="Search by user or email"
                    value={onSearchText}
                    onChange={(e) => onFilterChange(e)}
                  />
                  <Button className="searchGroup Name-submit btn-icon">
                    <Icon name="search"></Icon>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DataTableBody>
            <DataTableHead>
              <DataTableRow>
                <span className="sub-text" style={{ fontWeight: "bold" }}>
                  Folder Name
                </span>
              </DataTableRow>
            </DataTableHead>
          </DataTableBody>
        </DataTable>
      </Block>
    </Content>
  );
};

export default React.memo(Foldertable);
