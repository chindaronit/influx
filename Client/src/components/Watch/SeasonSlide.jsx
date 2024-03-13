import React from "react";
import Img from "../LadyLoadImage/Img";

const SeasonSlide = ({ episode, src }) => {
  return (
    <div className="season-slide" key={episode.id}>
      <Img src={src} alt={episode.title} className="img" />
      <h3 className="title">
        {episode.episode_number + ". "}
        {episode.title || episode.name}
      </h3>
    </div>
  );
};

export default SeasonSlide;
