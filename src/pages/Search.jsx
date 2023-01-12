import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Searchcards from "../components/Searchcards";
import { fetchRapidApi } from "../fetchingApi";

const Search = () => {
  const { searchid } = useParams();
  const [videosState, setVideosState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `videoHub - Search / ${searchid}`;
    fetchRapidApi(
      `search?part=snippet&q=${searchid}&regionCode=IN&maxResults=100&order=date`
    )
      .then((data) => {
        setVideosState(data);
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  }, [searchid]);

  return (
    <>
      {!loading ? (
        <Stack
          sx={{
            padding: {
              xs: "10px 20px",
              sm: "10px 20px",
              md: "10px 150px",
              lg: "10px 200px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.3em", sm: "1.6em", md: "1.7em", lg: "2em" },
              textAlign: "center",
            }}
          >
            {searchid} Results
          </Typography>
          <Stack
            direction="column"
            sx={{
              overflowY: "auto",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Searchcards videos={videosState.items} />
          </Stack>
        </Stack>
      ) : (
        <Stack
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          searching for {searchid}....
        </Stack>
      )}
    </>
  );
};

export default Search;
