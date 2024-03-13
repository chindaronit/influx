import React, { useState, useEffect } from "react";
import "./Stream.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { getComments } from "../../features/Comments/commentSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GetContent from "./GetContent";
import { getPlan } from "../../features/subscription/Subscription";
import { addToHistory } from "../../features/Specifics/historySlice";
import useFetch from "../../hooks/useFetch";

const StreamTv = () => {
  const { media, id, seasonCount, season, episode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [poster, setPoster] = useState(null);
  const [src, setSrc] = useState(null);
  const { url } = useSelector((state) => state.homePage);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { data: item, loading: mediaLoading } = useFetch(`/${media}/${id}`);

  const { user, token, loading, success } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    if (url && item?.backdrop_path) {
      setSrc(url?.backdrop + item?.backdrop_path);
    } else if (url && !item?.backdrop_path) {
      setSrc("/src/assets/no-background.jpg");
    }
    if (url && item?.poster_path) {
      setPoster(url.poster + item?.poster_path);
    } else if (url && !item?.poster_path) {
      setPoster("/src/assets/no-poster.jpg");
    }
  }, [url, item]);

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/signin");
    };

    if (!loading) {
      if (success) {
        dispatch(getPlan({ email: user?.email, token: token }));
        dispatch(
          getComments({ media_type: media, id, token, season, episode })
        );
        dispatch(
          addToHistory({
            media_type: media,
            id,
            token,
            email: user?.email,
          })
        );
      } else {
        timeoutId = setTimeout(handleTimeout, 5000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, token, loading, success]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading || mediaLoading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  const srcOrPoster = windowSize >= 1024 ? src : poster;

  return (
    !loading &&
    srcOrPoster &&
    !mediaLoading && (
      <GetContent
        media_type={media}
        id={id}
        seasonCount={seasonCount}
        season={season}
        episode={episode}
        token={token}
        user={user}
        src={srcOrPoster}
      />
    )
  );
};

export default StreamTv;
