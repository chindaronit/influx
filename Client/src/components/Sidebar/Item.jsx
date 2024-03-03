import React from "react";

const Item = ({ item }) => {
  return (
    <li className="sidebar-item">
      <item.icon className="icon" />
      <h3>{item.value}</h3>
    </li>
  );
};

export default Item;
