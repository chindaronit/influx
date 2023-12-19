import React, { useState, useEffect } from "react";
import MovieCardLower from "../MainContent/MovieCardLower";
import MovieCardUpper from "../MainContent/MovieCardUpper";
import  Gradients  from "../../assets/Gradients";

const ShowComponent = ({ email, section, data, Watchlist }) => {
  const [background, setBackground] = useState("");

  const getRandom = () => {
    var randomFraction = Math.random();

    // Scale the random fraction to the desired range (1 to 15)
    var index = Math.floor(randomFraction * 15);
    if (Gradients[index]) {
      setBackground(Gradients[index].background);
    }
  };
  useEffect(() => {
    getRandom();
  }, []);
  
  return (
    <div className="container">
      <div className="content-heading" style={{ background: background }}>
        <h1>{section}</h1>
      </div>
      <div className="card-container f-wrap">
        {data.map((item) => {
          return (
            <div className="movie-card mb-5" key={item.itemId}>
              <MovieCardUpper
                src={item.src}
                email={email}
                itemId={item.itemId}
                Watchlist={Watchlist}
              />
              <MovieCardLower
                year={item.year}
                rating={item.rating}
                description={item.description}
                title={item.title}
                genre={item.genre}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowComponent;
