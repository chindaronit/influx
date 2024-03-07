import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

const Player = () => {
  return (
    <ReactPlayer
      url="/src/assets/video.mp4"
      width="100%"
      height="100%"
      playing={false}
      controls
      classname="react-video-player"
    />
  );
};

export default Player;
