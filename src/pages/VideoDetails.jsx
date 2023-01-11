import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRapidApi } from "../fetchingApi";
import ReactPlayer from "react-player";
import { Avatar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const VideoDetails = () => {
  const { videoid } = useParams();

  // mui comments Accordion
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingSuggestion, setLoadingSuggestion] = useState(true);

  useEffect(() => {
    //fetching video details
    fetchRapidApi(
      `videos?part=contentDetails,snippet,statistics&id=${videoid}`
    ).then((data) => {
      setVideo(data.items[0]);
      setLoading(false);
    });

    // fetching video comments
    fetchRapidApi(
      `commentThreads?part=snippet&videoId=${videoid}&maxResults=100`
    ).then((commentsData) => {
      setComments(commentsData);
      setLoadingComments(false);
    });

    // fetching suggested video
    fetchRapidApi(
      `search?part=snippet&id=${videoid}&relatedToVideoId=${videoid}&type=video&maxResults=100`
    ).then((suggestedVideos) => {
      setSuggestedVideos(suggestedVideos);
      setLoadingSuggestion(false);
    });
  }, [videoid]);

  return (
    <>
      <Box>
        <Stack
          sx={{ display: "flex", flexDirection: { sm: "column", md: "row" } }}
        >
          {!loading ? (
            <Stack sx={{ width: { md: "75vw" } }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoid}`}
                className="react-player"
                controls
              />
              <Stack
                sx={{
                  padding: { xs: "10px 20px", md: "15px 100px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1em", md: "1.2em" },
                    padding: "0 5px",
                  }}
                >
                  {video.snippet.title}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  sx={{
                    marginTop: { xs: "8px", md: "0px" },
                  }}
                  justifyContent="space-between"
                >
                  <Link to={`/channel/${video.snippet.channelId}`}>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.2em", md: "2em" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid lightgrey",
                        padding: "5px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      {video.snippet.channelTitle}
                      <CheckCircle
                        sx={{
                          marginLeft: "5px",
                          color: "#716d6d",
                          fill: "currentcolor",
                          width: "20px",
                        }}
                      />
                    </Typography>
                  </Link>
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: ".75em", md: ".85em" },
                        letterSpacing: ".3px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      {parseInt(video.statistics.viewCount).toLocaleString()}{" "}
                      Views
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: ".75em", md: ".85em" },
                        letterSpacing: ".3px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      {parseInt(video.statistics.likeCount).toLocaleString()}{" "}
                      Likes
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* // loading */}
              {!loadingComments ? (
                <Stack
                  sx={{
                    padding: {
                      xs: "10px 20px 0 20px",
                      md: "10px 100px 0 100px",
                    },
                  }}
                >
                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                    sx={{
                      display: { md: "none" },
                      bgcolor: "#ebebeb",
                      borderRadius: "10px",
                      mb: "20px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "1.2em", md: "1.3em" },
                          pb: "10px",
                        }}
                      >
                        {comments.pageInfo.totalResults} Comments
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {comments.items.map((items, index) => {
                        index++;
                        return (
                          <Stack
                            key={index}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "center",

                              marginBottom: "30px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <Avatar
                                src={
                                  items.snippet.topLevelComment.snippet
                                    .authorProfileImageUrl
                                }
                                sx={{ width: "25px", height: "25px" }}
                              />
                              <Typography
                                sx={{
                                  fontSize: { xs: ".95em", md: "1em" },
                                  fontWeight: { xs: "400", md: "500" },
                                }}
                                variant="button"
                              >
                                {
                                  items.snippet.topLevelComment.snippet
                                    .authorDisplayName
                                }
                              </Typography>
                            </Box>

                            <Box sx={{ ml: "35px" }}>
                              <Typography
                                sx={{ fontSize: { xs: ".9em", md: "1em" } }}
                              >
                                {items.snippet.topLevelComment.snippet
                                  .textDisplay.length < 100
                                  ? items.snippet.topLevelComment.snippet
                                      .textDisplay
                                  : items.snippet.topLevelComment.snippet.textDisplay.slice(
                                      0,
                                      100
                                    ) + "....."}
                              </Typography>
                            </Box>
                          </Stack>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>

                  <Typography
                    sx={{
                      fontSize: { xs: "1.2em", md: "1.3em" },
                      pb: "10px",
                      display: { xs: "none" },
                    }}
                  >
                    {comments.pageInfo.totalResults} Comments
                  </Typography>

                  {comments.items.map((items, index) => {
                    index++;
                    return (
                      <Stack
                        key={index}
                        sx={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          display: { xs: "none", md: "flex" },
                          marginBottom: "30px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <Avatar
                            src={
                              items.snippet.topLevelComment.snippet
                                .authorProfileImageUrl
                            }
                            sx={{ width: "25px", height: "25px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: { xs: ".95em", md: "1em" },
                              fontWeight: { xs: "400", md: "500" },
                            }}
                            variant="button"
                          >
                            {
                              items.snippet.topLevelComment.snippet
                                .authorDisplayName
                            }
                          </Typography>
                        </Box>

                        <Box sx={{ ml: "35px" }}>
                          <Typography
                            sx={{ fontSize: { xs: ".9em", md: "1em" } }}
                          >
                            {items.snippet.topLevelComment.snippet.textDisplay
                              .length < 100
                              ? items.snippet.topLevelComment.snippet
                                  .textDisplay
                              : items.snippet.topLevelComment.snippet.textDisplay.slice(
                                  0,
                                  100
                                ) + "....."}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              ) : (
                "loading comments...."
              )}
            </Stack>
          ) : (
            // <Box sx={{ width: "100vw", margin: "15px 0" }}>
            //   <Skeleton variant="rectangular" width={"100vw"} height={"30vh"} />
            //   <Stack
            //     direction={"row"}
            //     justifyContent="space-between"
            //     alignItems="center"
            //     sx={{
            //       padding: {
            //         xs: "10px 10px",
            //         sm: "10px 10px",
            //         md: "10px 100px",
            //       },
            //     }}
            //   >
            //     <Skeleton variant="circular" width={50} height={50} />
            //     <Skeleton variant="rounded" width={245} height={40} />
            //   </Stack>
            // </Box>
            "loading..."
          )}
          <Stack
            sx={{
              width: { md: "25vw" },
              borderTop: { xs: "1px solid grey" },
              p: { xs: "15px", md: "10px" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.2em", md: "1.3em" },
                textAlign: "center",
              }}
            >
              Suggested Videos
            </Typography>
            {!loadingSuggestion ? (
              <Stack
                direction="row"
                sx={{
                  overflowY: "auto",
                  height: "90.2%",
                }}
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <Videos videos={suggestedVideos.items} />
              </Stack>
            ) : (
              "loading...."
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default VideoDetails;
