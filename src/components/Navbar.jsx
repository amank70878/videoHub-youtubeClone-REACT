import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import { SearchBar } from "./index";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor=" rgb(233, 233, 233)"
      height="6vh"
      sx={{
        position: "sticky",
        top: "0",
        justifyContent: "space-between",
        px: 2,
        py: 2,
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" width="35px" />
        <Typography
          sx={{
            ml: { xs: 1, md: 2 },
            fontSize: 20,
            display: { xs: "none", md: "inline-block" },
          }}
        >
          videoHub
        </Typography>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
