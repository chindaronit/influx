import React from "react";
import { NavItemData } from "../../assets/NavItemData";
import Item from "./Item";
import { OptionsData } from "../../assets/OptionsData";
import { Link } from "react-router-dom";
import "./style.css";
import { UserRelatedData } from "../../assets/UserRelatedData";
import { IconButton } from "@mui/material";

const SideBar = () => {
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
              <Link to={`/${item.path}`} key={index}>
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
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
