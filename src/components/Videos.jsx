import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import {
  demoProfilePicture,
  demoThumbnailUrl,
  demoVideoTitle,
} from "../utils/constants";

const Videos = ({ videos }) => {
  console.log(videos);
  return (
    <>
      {videos.map((items, index) => {
        index++;
        return (
          <Card sx={{ width: "345px", margin: "15px 0" }} key={index}>
            {items?.snippet?.thumbnails?.high?.url ? (
              <Link to={`/videos/${items.id.videoId}`}>
                <CardMedia
                  component="img"
                  height="194"
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
            <CardContent>
              <Link to={`/videos/${items?.snippet?.channelId}`} key={index}>
                <Typography variant="body2" color="text.secondary">
                  {items?.snippet?.title
                    ? items?.snippet?.title
                    : demoVideoTitle}
                </Typography>
              </Link>
            </CardContent>
            <Link to={`/channel/${items?.snippet?.channelId}`}>
              <CardHeader
                avatar={
                  <Avatar
                    src={
                      items?.snippet?.thumbnails?.high?.url
                        ? items?.snippet?.thumbnails?.high?.url
                        : demoProfilePicture
                    }
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={items?.snippet?.channelTitle}
                subheader="September 14, 2016"
              />
            </Link>
          </Card>
        );
      })}
    </>
  );
};

export default Videos;

//http://localhost:3000/channel/UCja491MDXvY9jY2lx7ham7Q
