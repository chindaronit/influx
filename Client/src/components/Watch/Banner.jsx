import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import Img from "../LadyLoadImage/Img";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Video from "../Video/Video";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Banner = ({ video, item, src, handleAlert, setText, endpoint }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.authSlice);

  const handleClick = async () => {
    if (!user || !token || !user?.email) {
      setText("Login first!");
      handleAlert();
    } else {
      try {
        const res = await fetch("http://localhost:5000/watchlist/api", {
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

  return (
    <div className="watch">
      <Img src={src} alt={item.title || item.name} className={"img"} />

      <div className="movie-info">
        <div className="cover">
          <img src={src} alt={item.title || item.name} />
        </div>
        <h1 className="title">
          {(item.title || item.name) +
            ` (${dayjs(item.release_date).format("YYYY")}) `}
        </h1>
        <h3 className="subtitle">{item.tagline}</h3>
        <h4 className="overview">{item.overview}</h4>

        <div className="d-flex jc-center info blue f-wrap">
          {item.genres.map((item, index, array) => {
            return (
              <React.Fragment key={item.id}>
                <h3>{item.name}</h3>
                {index < array.length - 1 && <h3>|</h3>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="d-flex jc-center pos-rel">
          <Button variant="contained" className="watch-btn">
            WATCH
          </Button>
          <div className="side-btn">
            <IconButton onClick={handleClick}>
              <AddIcon className="btn" />
            </IconButton>
            <div className="hover">Add to Watchlist</div>
          </div>
          {video?.key && (
            <div className="side-btn">
              <IconButton
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <PlayCircleIcon className="play-btn" />
              </IconButton>

              <div className="hover">Watch Trailer</div>
            </div>
          )}
        </div>
      </div>
      <Video
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default Banner;
