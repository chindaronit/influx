import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreDetails from "./MoreDetails";

const InfoComponent = ({ email, item, movieInfo }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(movieInfo);
  const handleAdd = async (email, itemId) => {
    try {
      console.log(email, itemId);
      const res = await fetch("http://localhost:5000/watchlist/api", {
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

  const toggleDetails = () => {
    showDetails ? setShowDetails(false) : setShowDetails(true);
  };

  return (
    <div className="watch">
      <img src={item.src} alt={item.title} className="img" />
      <div className="movie-info">
        <div className="cover">
          <img src={item.src} alt={item.title} />
        </div>
        <h1>{item.title}</h1>
        <h3 style={{ color: "rgba(255, 255, 255, 0.75)" }}>
          {item.description}
        </h3>

        <div className="d-flex flex-center info blue">
          <h3>{item.genre} </h3>
          <h3>|</h3>
          <h3>{item.year} </h3>
          <h3>|</h3>
          <h3>{item.duration} min </h3>
          <h3>|</h3>
          <h3>IMDB : {item.rating}</h3>
        </div>
        <div className="d-flex jc-center pos-rel">
          <Button variant="contained" className="watch-btn">
            WATCH
          </Button>
          <div className="side-btn">
            <IconButton
              onClick={() => {
                handleAdd(email, itemId);
              }}
            >
              <AddIcon className="btn" />
            </IconButton>
            <div className="hover">Add to Watchlist</div>
          </div>
          <div className="side-btn">
            <IconButton onClick={toggleDetails}>
              <MoreVertIcon className="btn" />
            </IconButton>
            <div className="hover">More Details</div>
          </div>
        </div>
      </div>
      {showDetails && movieInfo && <MoreDetails movieInfo={movieInfo} />}
    </div>
  );
};

export default InfoComponent;
