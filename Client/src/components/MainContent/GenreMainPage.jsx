import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCardLower from "./MovieCardLower";
import MovieCardUpper from "./MovieCardUpper";
import { Link } from "react-router-dom";
import { FilterData } from "../Filter/FilterData";

const GenreMainPage = ({ email, genre }) => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(()=>FilterData(res.data,genre));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="row-container">
      <div className="heading-div">
        <div className="row-heading">Top Rated {genre}</div>
        <Link to={`/section/filter/${genre}`} className="show-all">
          Show All
        </Link>
      </div>
      <div className="card-container">
        {data.slice(0, 4).map((item) => {
          return (
            <div className="movie-card" key={item.itemId}>
              <MovieCardUpper
                itemId={item.itemId}
                src={item.src}
                email={email}
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

export default GenreMainPage;
