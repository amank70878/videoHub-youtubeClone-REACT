import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  demoProfilePicture,
  demoThumbnailUrl,
  demoVideoTitle,
} from "../utils/constants";
import { Stack } from "@mui/system";

const Searchcards = ({ videos }) => {
  return (
    <>
      {videos.map((items, index) => {
        index++;
        return (
          <Card
            sx={{
              width: "100%",
              margin: "15px 0",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              },
              padding: "5px",
              borderRadius: "20px",
              bgcolor: "#e9e9e9bf",
              border: "none",
              boxShadow: 0,
            }}
            key={index}
          >
            {items?.snippet?.thumbnails?.high?.url ? (
              <Link to={`/videos/${items.id.videoId}`}>
                <CardMedia
                  component="img"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "300px",
                      md: "310px",
                      lg: "340px",
                    },
                    height: { xs: "100%", sm: "100%", md: "100", lg: "100" },
                    objectFit: "contain",
                  }}
                  image={
                    items.snippet.thumbnails.high.url
                      ? items.snippet.thumbnails.high.url
                      : demoThumbnailUrl
                  }
                  alt="Paella dish"
                />
              </Link>
            ) : (
              <Skeleton variant="rectangular" width={345} height={200} />
            )}
            <Stack
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <CardContent>
                <Link to={`/videos/${items?.id?.videoId}`} key={index}>
                  <Typography
                    sx={{
                      fontSize: { md: "1.11em", lg: "1.23em" },
                    }}
                    color="text.secondary"
                  >
                    {items?.snippet?.title
                      ? items?.snippet?.title
                      : demoVideoTitle}
                  </Typography>
                </Link>
              </CardContent>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: "60px", height: "60px" }}
                    src={
                      items?.snippet?.thumbnails?.high?.url
                        ? items?.snippet?.thumbnails?.high?.url
                        : demoProfilePicture
                    }
                  />
                }
                title={items?.snippet?.channelTitle}
                subheader="September 14, 2016"
              />
            </Stack>
          </Card>
        );
      })}
    </>
  );
};

export default Searchcards;
