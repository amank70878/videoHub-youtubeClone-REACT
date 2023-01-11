import { Button, Input, Paper } from "@mui/material";
import React from "react";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{
        padding: "2px 10px",
        borderRadius: "11px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Input className="search-bar" placeholder="Search.." />
      <Button sx={{ color: "red" }} type="submit">
        <Search />
      </Button>
    </Paper>
  );
};

export default SearchBar;
