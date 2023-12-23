import React, { useEffect } from "react";
import Slide from "./Slide";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const Watchlist = ({ email, handleAlert, setText }) => {
  const { movies, loading } = useSelector((state) => state.watchlist);

  if (loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }
  
  return (
    <div className="wrapper">
      {movies?.map((item, index) => {
        return (
          <div className="item" key={index}>
            <Slide
              data={item}
              endpoint={item.media_type}
              handleAlert={handleAlert}
              setText={setText}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Watchlist;
