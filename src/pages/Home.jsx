import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Loader, Sidebar, Videos } from "../components";
import { fetchRapidApi } from "../fetchingApi";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";

const Home = () => {
  const [selectedCategoryState, setSelectedCategoryState] = useState("New");
  const [videosState, setVideosState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRapidApi(
      `search?part=snippet&q=${selectedCategoryState}&regionCode=IN&maxResults=100&order=date`
    )
      .then((data) => {
        setVideosState(data);
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  }, [selectedCategoryState]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* sidebar */}
      <Box
        sx={{
          height: { sm: "auto", md: "94vh" },
          borderRight: "1px solid #8c8c8c",
          px: { sm: 0, md: 2 },
          width: { sm: "auto", md: "18vw" },
        }}
      >
        <Sidebar
          selectedCategoryState={selectedCategoryState}
          setSelectedCategoryState={setSelectedCategoryState}
        />
        <Typography className="copyright" variant="body1" sx={{ pt: 1.5 }}>
          Copyright 2022 videoHub Media
        </Typography>
      </Box>

      {/* videos */}
      <Box
        maxHeight="94vh"
        sx={{
          width: { sm: "100vw", md: "82vw" },
          overflowX: "hidden",
        }}
      >
        {/* heading */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, pt: 1 }}
        >
          <FormatAlignLeftIcon />

          <Typography
            color="red"
            sx={{
              fontSize: { xs: "1.4em", md: "1.5em" },
              textTransform: "capitalize",
            }}
          >
            {selectedCategoryState}{" "}
            <span style={{ color: "#000" }}>Videos</span>
          </Typography>
          <div></div>
        </Box>

        {/* videos */}
        {!loading ? (
          <>
            <Stack
              direction="row"
              sx={{
                overflowY: "auto",
                // height: "90.2%",
              }}
              flexWrap="wrap"
              justifyContent="space-around"
            >
              <Videos videos={videosState.items} />
            </Stack>
          </>
        ) : (
          <>
            <Stack
              direction="row"
              sx={{
                overflowY: "auto",
                height: { md: "95.2%" },
              }}
              flexWrap="wrap"
              justifyContent="space-around"
            >
              <Loader times={100} />
            </Stack>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Home;
