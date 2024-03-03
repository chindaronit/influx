import React, { useState, useEffect } from "react";
import "./Specifics.css";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StarIcon from "@mui/icons-material/Star";
import QueueIcon from "@mui/icons-material/Queue";
import { Link } from "react-router-dom";

const Specifics = () => {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      setTime("Good Morning!");
    } else if (hour < 16) {
      setTime("Good Noon!");
    } else {
      setTime("Good evening!");
    }
  }, []);

  return (
    <>
      <h2 className="time-status">{time}</h2>
      <div className="specifics">
        <Link to={"/watchlist"} className="link">
          <div className="item">
            <div className="item-text">Watchlist</div>
            <div className="item-icon">
              <QueueIcon />
            </div>
          </div>
        </Link>
        <Link to={"/liked"} className="link">
          <div className="item">
            <div className="item-text">Liked Content</div>
            <div className="item-icon">
              <ThumbUpIcon />
            </div>
          </div>
        </Link>
      </div>
      <div className="specifics mb-5">
        <Link to={"/history"} className="link">
          <div className="item">
            <div className="item-text">History</div>
            <div className="item-icon">
              <HistoryIcon />
            </div>
          </div>
        </Link>
        <Link to={"/favourite"} className="link">
          <div className="item">
            <div className="item-text">Favourites</div>
            <div className="item-icon">
              <StarIcon />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Specifics;
