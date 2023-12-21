import React from "react";
import dayjs from "dayjs";
import Img from "../LadyLoadImage/Img";

const RelatedInfo = ({ item, crew, poster }) => {
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="related-info">
      <div>
        <h2>More Details</h2>
        <ul className="list">
          <li className="list-item">
            {item.status && (
              <div className="infoItem">
                <span className="text bold">Status: </span>
                <span className="text">{item.status}</span>
              </div>
            )}
          </li>
          <li className="list-item">
            {item.release_date && (
              <div className="infoItem">
                <span className="text bold">Release Date: </span>
                <span className="text">
                  {dayjs(item.release_date).format("MMM D,YYYY")}
                </span>
              </div>
            )}
          </li>
          <li className="list-item">
            {item.runtime && (
              <div className="infoItem">
                <span className="text bold">Runtime: </span>
                <span className="text">{toHoursAndMinutes(item.runtime)}</span>
              </div>
            )}
          </li>
        </ul>

        {director?.length > 0 && (
          <span className="heading text bold">
            <u>Directors:</u>{" "}
          </span>
        )}
        <ul className="ml-4">
          {director?.map((item, index) => {
            return (
              <li className="text mv-1" key={index}>
                {item.name}
              </li>
            );
          })}
        </ul>

        {writer?.length > 0 && (
          <span className="heading text bold">
            <u>Writers:</u>{" "}
          </span>
        )}
        <ul className="ml-4">
          {writer?.map((item, index) => {
            return (
              <li className="text mv-1" key={index}>
                {item.name}
              </li>
            );
          })}
        </ul>

        {item?.created_by?.length > 0 && (
          <span className="heading text bold">
            <u>Created By:</u>{" "}
          </span>
        )}
        <ul className="ml-4">
          {item?.created_by?.map((item, index) => {
            return (
              <li className="text mv-1" key={index}>
                {item.name}
              </li>
            );
          })}
        </ul>

        <span className="text bold ml-2">
          <u>Languages:</u>
        </span>
        <span className="text blue capitalize">
          {" " + item.original_language}
        </span>
      </div>
      <Img src={poster} alt="" className="img" />
    </div>
  );
};

export default RelatedInfo;
