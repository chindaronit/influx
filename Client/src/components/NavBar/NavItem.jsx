import React from "react";

const NavItem = ({ item }) => {
  return (
    <li className="nav-item">
      <div>
        <div className="icon-div">
          <item.icon className="icon" />
        </div>
        <div className="icon-value">
          <h3>{item.value}</h3>
        </div>
      </div>
    </li>
  );
};

export default NavItem;
