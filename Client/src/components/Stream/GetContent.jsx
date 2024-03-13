import React, { useEffect } from "react";
import Rating from "./Rating/Rating";
import Player from "./Player/Player";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Seasons from "../Watch/Seasons";

const GetContent = ({
  media_type,
  id,
  token,
  user,
  season,
  episode,
  seasonCount,
  src,
}) => {
  const navigate = useNavigate();
  const { plan, loading, success } = useSelector((state) => state.subscription);

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/subscription");
    };

    if (!loading) {
      if (success && !plan) {
        timeoutId = setTimeout(handleTimeout, 2000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [plan, loading]);

  if (loading || !plan) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading &&
    plan && (
      <div className="stream">
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <Player />
            {seasonCount && (
              <Seasons totalSeasons={seasonCount} id={id} src={src} />
            )}
            <Rating
              media_type={media_type}
              id={id}
              season={season}
              episode={episode}
              token={token}
              user={user}
            />
          </div>
          <Footer />
        </ContentWrapper>
        <SideBar />
      </div>
    )
  );
};

export default GetContent;
