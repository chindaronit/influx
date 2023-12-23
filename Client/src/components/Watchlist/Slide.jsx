import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Rating from "../Movies/Rating";
import Img from "../LadyLoadImage/Img";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../features/watchlist/watchlistSlice";

const Slide = ({ data, endpoint, handleAlert, setText }) => {
  const [src, setSrc] = useState(null);
  const url = useSelector((state) => state.homePage.url);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.backdrop_path) {
      setSrc(url.backdrop + data.backdrop_path);
    } else {
      setSrc("/src/assets/no-background.jpg");
    }
  }, [url.backdrop, data]);

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/watchlist/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "ronitchinda100@gmail.com",
          id: data.id,
          media_type: endpoint,
        }),
      });

      if (res.status === 200) {
        dispatch(removeMovie({id:data.id}));
        setText("Removed From Wathclist");
        handleAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <IconButton onClick={handleClick}>
              <RemoveIcon className="remove-btn" />
              <div className="hover">Remove</div>
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
