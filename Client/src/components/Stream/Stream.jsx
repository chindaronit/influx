import React from "react";
import Rating from "./Rating/Rating";
import Player from "./Player/Player";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import "./Stream.css";

const Stream = () => {
  return (
    <div className="stream">
      <ContentWrapper>
        <Navbar />
        <div className="container">
          <Player />
          <Rating />
        </div>
      </ContentWrapper>
      <SideBar />
    </div>
  );
};

export default Stream;
