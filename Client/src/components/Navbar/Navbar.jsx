import React from "react";
import "./style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav container">
      <div className="menu">
        <ul>
          <Link to={"/explore/movie"} className="link" style={{color:"white"}}>
            <li>
              <MovieIcon className="icon" /> Movies
            </li>
          </Link>
          <Link to={"/explore/tv"} className="link" style={{color:"white"}}>
            <li>
              <TvIcon className="icon" /> TV Shows
            </li>
          </Link>
        </ul>
      </div>
      <div className="nav-user">
        <h3>Ronit Chinda</h3>
        <AccountCircleIcon className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
