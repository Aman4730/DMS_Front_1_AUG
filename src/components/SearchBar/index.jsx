import React, { useEffect, useState } from "react";
import { Button, Icon } from "../Component";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Stack } from "@mui/material";
import axios from "axios";

const SearchBar = ({
  handleClick,
  searchButton,
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearch = () => {};
  return (
    <div style={{ position: "relative", marginRight: "10px" }}>
      <TextField
        placeholder="Search..."
        variant="outlined"
        size="small"
        style={{
          borderRadius: "8px",
          width: "200px",
          marginTop: searchButton === "true" ? "0px" : "20px",
        }}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        inputProps={{
          style: {
            padding: searchButton === "true" ? "2px 20px" : "3px 20px",
          },
        }}
      />
      <Stack
        aria-label="search"
        onClick={searchButton !== "true" ? handleSearch : undefined}
        style={{
          position: "absolute",
          top: searchButton === "true" ? "50%" : "72%",
          right: searchButton === "true" ? "3px" : "45px",
          transform:
            searchButton === "true" ? "translateY(-50%)" : "translateY(-50%)",
          cursor: searchButton !== "true" ? "pointer" : "auto",
        }}
      >
        <SearchIcon fontSize="small" />
      </Stack>
      {!searchButton && (
        <Button
          color="primary"
          className="btn-icon"
          onClick={handleClick}
          style={{ margin: "19px 0px 0px 5px", height: "30px" }}
        >
          <Icon name="plus" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
