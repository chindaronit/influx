import React from "react";
import { NavItemData } from "../../assets/NavItemData";
import Item from "./Item";
import { OptionsData } from "../../assets/OptionsData";
import { Link } from "react-router-dom";
import { UserRelatedData } from "../../assets/UserRelatedData";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const SideBar = ({ handleAlert, setText }) => {
  const { user, token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <div className="container mb-2">
        <div className="logo">
          <IconButton>
            <img src="/src/assets/logo.svg" alt="logo" />
          </IconButton>
          <div className="logo-txt">
            <h1>Influx</h1>
          </div>
        </div>
        <ul className="sidebar-list">
          {NavItemData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index} className="link">
                <Item item={item} />
              </Link>
            );
          })}
          {OptionsData.map((item, index) => {
            return (
              <Link to={`/section/${item.path}`} key={index} className="link">
                <Item item={item} key={index} />
              </Link>
            );
          })}
          {UserRelatedData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index} className="link">
                <Item item={item} key={index} />
              </Link>
            );
          })}
          {user && user.email && token ? (
            <li
              className="sidebar-item"
              onClick={() => {
                dispatch(handleLogout());
                setText("Successfully logged Out!");
                handleAlert();
                navigate("/");
              }}
            >
              <LogoutIcon className="icon" />
              <h3>Logout</h3>
            </li>
          ) : (
            <Link to="/signin" className="link">
              <li className="sidebar-item">
                <LogoutIcon className="icon" />

                <h3>Login</h3>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
