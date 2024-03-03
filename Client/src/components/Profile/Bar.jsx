import React from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Bar = () => {
  return (
    <div className="container">
      <div className="profile-bar">
        <div className="logo">
          <IconButton>
            <img
              src="/src/assets/logo.svg"
              alt="logo"
              style={{ width: "3rem" }}
            />
          </IconButton>
          <div className="txt">
            <h2>Influx</h2>
          </div>
        </div>
        <Link to={"/"} className="link">
          <h2>Home</h2>
        </Link>
      </div>
    </div>
  );
};

export default Bar;
