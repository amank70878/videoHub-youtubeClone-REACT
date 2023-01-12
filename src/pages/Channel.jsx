import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Avatar, Button, CardMedia, Skeleton, Typography } from "@mui/material";
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
    document.title = `videoHub - Channel / ${channelid}`;
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
            minHeight: { xs: "56vh", sm: "56vh", md: "56vh", lg: "44vh" },
          }}
        >
          <Box width="100vw" bgcolor="#000">
            <CardMedia
              component="img"
              src={channel?.brandingSettings?.image?.bannerExternalUrl}
              alt=""
              className="channelThumbnail"
            />
          </Box>
          <Stack
            sx={{
              flexDirection: { md: "column", lg: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              padding: { xs: " 0 10px", md: "0 60px" },
              gap: "20px",
              position: {
                xs: "absolute",
                sm: "absolute",
                md: "absolute",
                lg: "relative",
              },
              top: { xs: "23vh", sm: "23vh", md: "23vh", lg: "0%" },
              left: { xs: "50%", sm: "50%", md: "50%" },
              transform: {
                xs: "translateX(-50%)",
                sm: "translateX(-50%)",
                md: "translateX(-50%)",
              },
              zIndex: 10,
            }}
          >
            <Stack
              sx={{
                flexDirection: { md: "column", lg: "row" },
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Avatar
                src={channel?.snippet?.thumbnails?.high?.url}
                className="channelProfile"
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.4em", md: "1.5em" },
                    fontWeight: "500",
                    letterSpacing: ".2px",
                    lineHeight: 1.3,
                    textAlign: { xs: "center" },
                  }}
                >
                  {channel?.snippet?.title}
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
                  {channel?.snippet?.customUrl}
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
                    channel?.statistics?.subscriberCount
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
            {channel?.snippet?.title} Videos
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
            <Videos videos={channelVideos?.items} />
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
