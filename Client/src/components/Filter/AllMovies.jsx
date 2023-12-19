import React, { useState, useEffect } from "react";
import { SortLatest } from "./SortLatest";
import MovieCardLower from "../MainContent/MovieCardLower";
import MovieCardUpper from "../MainContent/MovieCardUpper";
import axios from "axios";

const AllMovies = ({ email }) => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(() => SortLatest(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="card-container f-wrap">
      {data.slice(0, 10).map((item) => {
        return (
          <div className="movie-card mb-5" key={item.itemId}>
            <MovieCardUpper src={item.src} email={email} itemId={item.itemId} />
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
  );
};

export default AllMovies;
