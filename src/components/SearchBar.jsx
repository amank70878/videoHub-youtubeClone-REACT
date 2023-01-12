import { Button, Input, Paper } from "@mui/material";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const searchFunc = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        searchFunc(e);
      }}
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
      <Input
        className="search-bar"
        placeholder="Search.."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button sx={{ color: "red" }} type="submit">
        <Search />
      </Button>
    </Paper>
  );
};

export default SearchBar;
