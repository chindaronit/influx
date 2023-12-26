import React, { useEffect } from "react";
import { NavItemData } from "../../assets/NavItemData";
import Item from "./Item";
import { OptionsData } from "../../assets/OptionsData";
import { Link } from "react-router-dom";
import "./style.css";
import { UserRelatedData } from "../../assets/UserRelatedData";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SideBar = ({handleAlert,setText}) => {
  const { user, token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <div className="container">
        <div className="logo">
          <IconButton>
            <img
              src="/src/assets/logo.svg"
              alt="logo"
              style={{ width: "4rem" }}
            />
          </IconButton>
          <div className="txt">
            <h1>Influx</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="nav-list">
          {NavItemData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index}>
                <Item item={item} />
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="container">
        <ul className="nav-list">
          {OptionsData.map((item, index) => {
            return (
              <Link to={`/section/${item.path}`} key={index}>
                <Item item={item} key={index} />
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="container">
        <ul className="nav-list">
          {UserRelatedData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index}>
                <Item item={item} key={index} />
              </Link>
            );
          })}
          {user && user.email && token ? (
            <li
              className="nav-item"
              onClick={() => {
                dispatch(handleLogout());
                setText("Successfully logged Out!");
                handleAlert();
                navigate("/");
              }}
            >
              <div>
                <div className="icon-div">
                  <LogoutIcon className="icon" />
                </div>
                <div className="icon-value">
                  <h3>Logout</h3>
                </div>
              </div>
            </li>
          ) : (
            <Link to="/signin">
              <li className="nav-item">
                <div>
                  <div className="icon-div">
                    <LogoutIcon className="icon" />
                  </div>
                  <div className="icon-value">
                    <h3>Login</h3>
                  </div>
                </div>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
