import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state)=>state.authSlice);

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
        <h3>{user?.name}</h3>
        <AccountCircleIcon className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
