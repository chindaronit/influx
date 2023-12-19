import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const MovieInfo = ({
  itemId,
  title,
  duration,
  genre,
  rating,
  description,
  email,
  year,
  maxLines = 5,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Check if description is defined before splitting
  const words = description ? description.split(" ") : [];

  // Display either the full description or the truncated version
  const displayedDescription = showFullDescription
    ? description
    : words.slice(0, maxLines * 5).join(" ");
  const isMore = words.length > maxLines * 5;

  const handleAdd = async (email, itemId) => {
    try {
      const res = await fetch("http://localhost:5000/watchlist/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          itemId: itemId,
        }),
      });

      if (res.status === 200) {
        console.log("Added to Your Watchlist");
      } else {
        window.alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="slider-info-container">
      <div className="info">
        <h1>{title}</h1>
        <div className="d-flex jc-around blue">
          <h3>{genre} </h3>
          <h3>|</h3>
          <h3>{year} </h3>
          <h3>|</h3>
          <h3>{duration} min </h3>
          <h3>|</h3>
          <h3>IMDB : {rating}</h3>
        </div>
        {displayedDescription}{" "}
        {isMore && !showFullDescription && (
          <span
            onClick={() => setShowFullDescription(true)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            ...more
          </span>
        )}
      </div>
      <div className="slider-btn-container">
        <Link to={`/watch/${itemId}`}>
          <Button variant="contained" className="watch-btn">
            WATCH NOW
          </Button>
        </Link>
        <div className="add-btn">
          <IconButton
            onClick={() => {
              handleAdd(email, itemId);
            }}
          >
            <AddIcon className="btn" />
            <div className="add-to-watchlist">Add to Watchlist</div>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
