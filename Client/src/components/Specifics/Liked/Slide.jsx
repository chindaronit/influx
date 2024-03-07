import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Rating from "../../Movies/Rating";
import Img from "../../LadyLoadImage/Img";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../../features/Specifics/likedSlice";
import { useNavigate } from "react-router-dom";
import { PORT } from "../../../utils/config";

const Slide = ({ data, endpoint, handleAlert, setText }) => {
  const [src, setSrc] = useState(null);
  const url = useSelector((state) => state.homePage.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.authSlice);
  const [poster, setPoster] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (data.backdrop_path) {
      setSrc(url.backdrop + data.backdrop_path);
    } else {
      setSrc("/src/assets/no-background.jpg");
    }
    if (url && data?.backdrop_path) {
      setSrc(url?.backdrop + data?.backdrop_path);
    } else if (url && !data?.backdrop_path) {
      setSrc("/src/assets/no-background.jpg");
    }

    if (url && data?.poster_path) {
      setPoster(url.poster + data?.poster_path);
    } else if (url && !data?.poster_path) {
      setPoster("/src/assets/no-poster.jpg");
    }
  }, [url, data]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = async () => {
    try {
      const res = await fetch(`${PORT}/liked/api`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          id: data.id,
          media_type: endpoint,
        }),
      });

      if (res.status === 200) {
        dispatch(removeMovie({ id: data.id }));
        setText("Removed From Liked Content");
        handleAlert();
      } else if (res.status === 401) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const srcOrPoster = windowSize >= 1024 ? src : poster;

  return srcOrPoster ? (
    <div className="slide m-2" key={data.id}>
      <Img src={srcOrPoster} alt={data.title} className="img" />
      <h3 className="title">{data.title || data.name}</h3>
      <h5 className="release-date blue">
        {dayjs(data.release_date).format("MMM D,YYYY")}
      </h5>
      <div className="btn-container">
        <Link to={`/${endpoint}/${data.id}`} className="link d-flex">
          <Button variant="contained" size="large" className="watch-btn">
            WATCH
          </Button>
        </Link>
        <div className="add-btn">
          <IconButton onClick={handleClick}>
            <RemoveIcon className="remove-icon" />
          </IconButton>
        </div>
      </div>
      <div className="rating">
        <Rating rating={data.vote_average.toFixed(1)} />{" "}
      </div>
    </div>
  ) : null;
};

export default Slide;
