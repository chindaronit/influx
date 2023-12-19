import React from "react";

const MoreDetails = ({ movieInfo }) => {
  return (
    <div className="more-details">
      <h1>
        <u>Details</u>
      </h1>
      <div className="content">
        <h2>
          <u>Cast</u>
        </h2>
        <ul>
          {movieInfo.cast.map((item) => {
            return (
              <li>
                <h3>{item}</h3>
              </li>
            );
          })}
        </ul>
        <h2>
          <u>Directors</u>
        </h2>
        <ul>
          {movieInfo.directors.map((item) => {
            return (
              <li>
                <h3>{item}</h3>
              </li>
            );
          })}
        </ul>
        <h2>
          <u>Producers</u>
        </h2>
        <ul>
          {movieInfo.producers.map((item) => {
            return (
              <li>
                <h3>{item}</h3>
              </li>
            );
          })}
        </ul>
        <h2>
          <u>Languages</u>
        </h2>
        <div className="d-flex jc-center blue">
          {movieInfo.languages.map((item, index) => (
            <React.Fragment key={item}>
              <h3 className="lang">{item}</h3>
              {index !== movieInfo.languages.length - 1 && (
                <span className="separator">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
