import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { SortLatest } from "./SortLatest";
import MovieCardLower from "../MainContent/MovieCardLower";
import MovieCardUpper from "../MainContent/MovieCardUpper";
import axios from "axios";

const LatestRelease = ({ email }) => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(()=>SortLatest(res.data));
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
                "linear-gradient(0deg, rgba(185,185,185,1) 0%, rgba(199,148,40,1) 100%)",
            }}
          >
            <h1>Latest Release</h1>
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
