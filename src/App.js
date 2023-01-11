import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { fetchRapidApi } from "./fetchingApi";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";

const App = () => {
  const [errorLaoding, setErrorLaoding] = useState(true);
  useEffect(() => {
    fetchRapidApi(
      `search?part=snippet&q=hello&regionCode=IN&maxResults=1&order=date`
    )
      .then(setErrorLaoding(false))
      .catch((error) => {
        console.warn("API ERROR : ", error);
        setErrorLaoding(true);
      });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {errorLaoding ? (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "center" },
              fontSize: { xs: ".9em", lg: "1.35em" },
              fontWeight: { md: "400" },
            }}
          >
            RAPID API Limits exceeded the DAILY quota <br /> please try again
            tomorrow
          </Alert>
        ) : (
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/videos/:videoid" element={<VideoDetails />} />
            <Route path="/channel/:channelid" element={<Channel />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
