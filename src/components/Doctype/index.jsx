import React from "react";
import {
  Block,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  TooltipComponent,
} from "../Component";
import { Switch } from "@mui/material";

const Doctype = ({
  onSearch,
  toggle,
  tablesm,
  toggleData,
  handleClickOpen,
  onBlockClick,
  userData,
  totalUsers,
  itemPerPage,
  paginate,
  currentPage,
  onSearchText,
}) => {
  const tableheaderData = [
    {
      title: "Doctype Name",
      style: {},
    },
    {
      title: "Action",
      style: { marginLeft: "30px" },
    },
  ];
  return (
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
            <div className="card-body">
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
                <Button className="search-submit btn-icon">
                  <Icon name="search"></Icon>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* user Table */}
        <DataTableBody>
          <DataTableHead>
            {tableheaderData.map((data) => (
              <DataTableRow key={data.title}>
                <span
                  className="sub-text"
                  style={{ fontWeight: "bold", ...data.style }}
                >
                  {data.title}
                </span>
              </DataTableRow>
            ))}
          </DataTableHead>

          {toggleData.length &&
            toggleData.map((item) => (
              <DataTableItem key={item.id}>
                <DataTableRow size="md" style={{ innerHeight: "10px" }}>
                  <span>{item.doctype_name}</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions">
                    <li>
                      <Switch
                        size="small"
                        checked={item?.doc_status == "true" ? true : false}
                        onChange={(event) =>
                          onBlockClick(
                            item.id,
                            item?.doc_status != "true" ? "true" : "false"
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
                    <li onClick={() => handleClickOpen(item.id)}>
                      <TooltipComponent
                        tag="a"
                        containerClassName="btn btn-trigger btn-icon"
                        id={`edit${item.id}`}
                        icon="icon ni ni-trash-alt"
                        direction="top"
                        text="Edit"
                        style={{
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          color: "inherit",
                        }}
                      />
                      &nbsp;&nbsp;
                    </li>
                  </ul>
                </DataTableRow>
              </DataTableItem>
            ))}
        </DataTableBody>
      </DataTable>
    </Block>
  );
};

export default React.memo(Doctype);
