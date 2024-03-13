import React, { useEffect } from "react";
import Rating from "./Rating/Rating";
import Player from "./Player/Player";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Footer from "../Footer/Footer";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetContent = ({ media_type, id, token, user, handleAlert, setText }) => {
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

  const handleWatchlistClick = async () => {
    if (!user || !token || !user?.email) {
      setText("Login first!");
      handleAlert();
    } else {
      try {
        const res = await fetch(`${PORT}/watchlist/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            id: item.id,
            media_type: endpoint,
          }),
        });

        if (res.status === 200) {
          setText("Added to Watchlist");
          handleAlert();
        } else if (res.status === 401) {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikedClick = async () => {
    if (!user || !token || !user?.email) {
      setText("Login first!");
      handleAlert();
    } else {
      try {
        const res = await fetch(`${PORT}/liked/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            id: item.id,
            media_type: endpoint,
          }),
        });

        if (res.status === 200) {
          setText("Added to Liked");
          handleAlert();
        } else if (res.status === 401) {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFavouriteClick = async () => {
    if (!user || !token || !user?.email) {
      setText("Login first!");
      handleAlert();
    } else {
      try {
        const res = await fetch(`${PORT}/favourite/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            id: item.id,
            media_type: endpoint,
          }),
        });

        if (res.status === 200) {
          setText("Added to Favourites");
          handleAlert();
        } else if (res.status === 401) {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading || !plan) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading && plan && (
      <div className="stream">
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <Player />

            <div className="player-content-options">
              <div className="side-btn">
                <IconButton
                  onClick={() => {
                    handleWatchlistClick();
                  }}
                >
                  <AddIcon className="btn" />
                </IconButton>
                <div className="hover">Add to Watchlist</div>
              </div>

              <div className="side-btn">
                <IconButton
                  onClick={() => {
                    handleFavouriteClick();
                  }}
                >
                  <StarIcon className="play-btn" />
                </IconButton>

                <div className="hover">Add to Favourite</div>
              </div>

              <div className="side-btn">
                <IconButton
                  onClick={() => {
                    handleLikedClick();
                  }}
                >
                  <ThumbUpIcon className="play-btn" />
                </IconButton>

                <div className="hover">Like</div>
              </div>
            </div>
            <Rating media_type={media_type} id={id} season={season} episode={episode} token={token} user={user} />
          </div>
          <Footer />
        </ContentWrapper>
        <SideBar />
      </div>
    )
  );
};

export default GetContent;
