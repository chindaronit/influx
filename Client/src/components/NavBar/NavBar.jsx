import React, { useState, useEffect } from "react";
import { NavItemData } from "../../assets/NavItemData";
import NavItem from "./NavItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { OptionsData } from "../../assets/OptionsData";
import { IconButton } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const NavBar = ({ email }) => {
  const [data, setData] = useState([]);
  console.log(email);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/user/api", {
        params: { email: email },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, [email,data]);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-icon ">
          <div className="icon-div">
            <IconButton>
              <img
                src="/src/assets/logo.svg"
                alt="logo"
                style={{ width: "3rem" }}
              />
            </IconButton>
          </div>
          <div className="Logo-name">
            <h1>Influx</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="nav-list">
          {OptionsData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index}>
                <NavItem item={item} key={index} />
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="container">
        <ul className="nav-list">
          {NavItemData.map((item, index) => {
            return (
              <Link to={`/${item.path}`} key={index}>
                <NavItem item={item} />
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="container c-pointer">
        <div className="nav-user">
          <AccountCircleIcon className="user-icon" />
          <div className="user-name">
            <h3>{data.name}</h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
