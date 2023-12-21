import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Rating from "./Rating";
import Img from "../LadyLoadImage/Img";
import { Link } from "react-router-dom";

const Slide = ({ data, endpoint, handleAlert, setText }) => {
  const [src, setSrc] = useState(null);
  const url = useSelector((state) => state.homePage.url);

  useEffect(() => {
    if (data.backdrop_path) {
      setSrc(url.backdrop + data.backdrop_path);
    } else {
      setSrc("/src/assets/no-background.jpg");
    }
  }, [url.backdrop, data]);

  return src ? (
    <div className="slide" key={data.id}>
      <div className="pos-rel">
        <Img src={src} alt={data.title} className="img" />
        <div className="btn-container">
          <Link to={`/${endpoint}/${data.id}`} className="link d-flex">
            <Button variant="contained" size="small" className="watch-btn">
              WATCH NOW
            </Button>
          </Link>
          <div className="add-btn">
            <IconButton
              onClick={() => {
                setText("Added to Watchlist");
                handleAlert();
              }}
            >
              <AddIcon className="btn" />
              <div className="hover">Add to Watchlist</div>
            </IconButton>
          </div>
        </div>
        <div className="rating">
          <Rating rating={data.vote_average.toFixed(1)} />{" "}
        </div>
      </div>
      <h3 className="title">{data.title || data.name}</h3>
      <h5 className="release-date blue">
        {dayjs(data.release_date).format("MMM D,YYYY")}
      </h5>
    </div>
  ) : null;
};

export default Slide;
