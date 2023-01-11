import { Category } from "@mui/icons-material";
import { Stack } from "@mui/system";
import React from "react";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategoryState, setSelectedCategoryState }) => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          overflowY: "auto",
          height: { sx: "auto", md: "95%" },
          flexDirection: { md: "column" },
        }}
      >
        {categories.map((items) => (
          <button
            key={items.name}
            className="category-btn"
            onClick={() => setSelectedCategoryState(items.name)}
            style={{
              background: selectedCategoryState === items.name && "#ff1100",
            }}
          >
            <span
              className="span1"
              style={{
                color: selectedCategoryState === items.name ? "black" : "red",
                marginRight: "15px",
              }}
            >
              {items.icon}
            </span>
            <span
              className="span2"
              style={{
                opacity: Category.name === selectedCategoryState ? 1 : 0.7,
              }}
            >
              {items.name}
            </span>
          </button>
        ))}
      </Stack>
    </>
  );
};

export default Sidebar;
