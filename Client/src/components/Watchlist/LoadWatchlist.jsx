import React, { useEffect } from "react";
import Watchlist from "./Watchlist";
import { useDispatch } from "react-redux";
import { getMovies } from "../../features/watchlist/watchlistSlice";

const LoadWatchlist = ({ email, handleAlert, setText }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(email));
  }, []);

  return (
    <div className="container">
      <div className="content-heading">
        <h1>Watchlist</h1>
      </div>
      <Watchlist email={email} handleAlert={handleAlert} setText={setText}/>
    </div>
  );
};

export default LoadWatchlist;
