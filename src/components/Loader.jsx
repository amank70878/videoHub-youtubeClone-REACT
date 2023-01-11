import { Skeleton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const Loader = ({ times }) => {
  const num = new Array(times).fill(1);
  return (
    <>
      {num.map((items, index) => {
        index++;
        return (
          <Box
            key={index}
            sx={{ width: "345px", margin: "15px 0", height: "320px" }}
          >
            <Skeleton variant="rectangular" width={345} height={200} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
              p="2"
            >
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="rounded" width={245} height={40} />
            </Stack>
          </Box>
        );
      })}
    </>
  );
};

export default Loader;
