import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import MovieCardLower from "../MainContent/MovieCardLower";
import MovieCardUpper from "../MainContent/MovieCardUpper";
import axios from "axios";
import { RatingFilterData } from "./RatingFilterData";

const LatestRelease = ({ email }) => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(() => RatingFilterData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="page">
      <NavBar email={email} />
      <div className="main-content">
        <div className="container">
          <div
            className="content-heading"
            style={{
              background:
                "linear-gradient(90deg, rgba(23,20,79,1) 0%, rgba(31,31,31,1) 0%, rgba(78,179,196,1) 65%, rgba(31,60,120,1) 100%",
            }}
          >
            <h1>Top Rated</h1>
          </div>
          <div className="card-container f-wrap">
            {data.slice(0, 16).map((item) => {
              return (
                <div className="movie-card mb-5" key={item.itemId}>
                  <MovieCardUpper
                    src={item.src}
                    email={email}
                    itemId={item.itemId}
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
        <Footer />
      </div>
    </div>
  );
};

export default LatestRelease;
