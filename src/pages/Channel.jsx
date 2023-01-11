import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Button, Skeleton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRapidApi } from "../fetchingApi";
import { Loader, Videos } from "../components";

const Channel = () => {
  const { channelid } = useParams();

  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingChannelVideos, setLoadingChannelVideos] = useState(true);

  useEffect(() => {
    //fetching channel details
    fetchRapidApi(`channels?part=snippet,statistics&id=${channelid}`).then(
      (data) => {
        setChannel(data.items[0]);
        setLoadingChannels(false);
      }
    );

    // fetching channel videos
    fetchRapidApi(
      `search?part=snippet,id&channelId=${channelid}&order=date& maxResults=200`
    ).then((data) => {
      setChannelVideos(data);
      setLoadingChannelVideos(false);
    });
  }, [channelid]);
  return (
    <>
      {loadingChannels ? (
        <Box sx={{ width: "100vw", margin: "15px 0" }}>
          <Skeleton variant="rectangular" width={"100vw"} height={"30vh"} />
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: { xs: "10px 10px", sm: "10px 10px", md: "10px 100px" },
            }}
          >
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={245} height={40} />
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <Box width="100vw" bgcolor="#000">
            <img
              src={channel.brandingSettings.image.bannerExternalUrl}
              alt=""
              className="channelThumbnail"
            />
          </Box>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              padding: { xs: " 0 10px", md: "0 60px" },
              gap: "20px",
              position: { xs: "absolute", md: "relative" },
              top: { xs: "26vh", md: "0%" },
              left: { xs: "50%" },
              transform: { xs: "translateX(-50%)" },
            }}
          >
            <Stack
              sx={{
                flexDirection: { sm: "column", md: "row" },
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={channel.snippet.thumbnails.high.url}
                alt=""
                className="channelProfile"
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.4em", md: "1.7em" },
                    fontWeight: "500",
                    letterSpacing: ".2px",
                    lineHeight: 1.3,
                    textAlign: { xs: "center" },
                  }}
                >
                  {channel.snippet.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1em", md: "1.2em" },
                    fontWeight: "400",
                    letterSpacing: ".2px",
                    color: "#4b4b4b",
                    textAlign: { xs: "center" },
                  }}
                >
                  {channel.snippet.customUrl}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1em", md: "1.2em" },
                    fontWeight: "400",
                    letterSpacing: ".2px",
                    color: "#4b4b4b",
                    textAlign: { xs: "center" },
                  }}
                >
                  {parseInt(
                    channel.statistics.subscriberCount
                  ).toLocaleString()}{" "}
                  Subscriber
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              color="error"
              endIcon={<AddCircleOutlineRounded />}
            >
              subscribe
            </Button>
          </Stack>
        </Box>
      )}
      <Stack>
        {!loadingChannels && (
          <Typography variant="h5" textAlign="center">
            {channel.snippet.title} Videos
          </Typography>
        )}
        <Stack
          direction="row"
          sx={{
            overflowY: "auto",
            padding: { xs: "0 20px", md: "0 100px" },
          }}
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="space-around"
        >
          {!loadingChannelVideos ? (
            <Videos videos={channelVideos.items} />
          ) : (
            <Stack
              direction="row"
              sx={{
                overflowY: "auto",
                height: { md: "95.2%" },
              }}
              flexWrap="wrap"
              justifyContent="space-around"
            >
              <Loader times={50} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Channel;
