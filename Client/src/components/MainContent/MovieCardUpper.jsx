import React from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

const MovieCardUpper = ({ email, itemId, src, Watchlist }) => {
  
  const handleAddRemove = async (email, itemId, Watchlist) => {
    if (Watchlist) {
      try {
        const res = await fetch("http://localhost:5000/watchlist/api", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            itemId: itemId,
          }),
        });

        if (res.status === 200) {
          window.location.reload();
        } else {
          window.alert("Error");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
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
          return;
        } else {
          window.alert("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="card-upper">
      <div className="img">
        <img src={src} alt="" />
      </div>

      <div className="btn-container">
        <Link to={`/watch/${itemId}`}>
          <Button variant="contained" className="watch-btn">
            WATCH NOW
          </Button>
        </Link>
        {!Watchlist ? (
          <div className="add-btn">
            <IconButton
              onClick={() => {
                handleAddRemove(email, itemId, Watchlist);
              }}
            >
              <AddIcon className="btn" />
              <div className="hover">Add to Watchlist</div>
            </IconButton>
          </div>
        ) : (
          <div className="add-btn">
            <IconButton
              onClick={() => {
                handleAddRemove(email, itemId, Watchlist);
              }}
            >
              <RemoveIcon className="btn" />
              <div className="hover">Remove from Watchlist</div>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCardUpper;
