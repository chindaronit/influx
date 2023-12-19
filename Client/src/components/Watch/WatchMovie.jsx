import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import InfoComponent from "./InfoComponent";
import AllMovies from "../Filter/AllMovies";

const WatchMovie = ({ email, itemId }) => {
  const [data, setData] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const [title, setTitle] = useState(null);

  const getMoreDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movieDetails/api", {
        params: { title: title },
      });
      setMovieInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movies/api/id", {
          params: { itemId: itemId },
        });

        setData(res.data);

        if (res.data.title) {
          setTitle(res.data.title);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (itemId) {
      getAPIData();
    }
  }, [itemId]);

  useEffect(() => {
    // Check if title exists and then call getMoreDetails
    if (title) {
      getMoreDetails();
    }
  }, [title]);

  return (
    <div className="page">
      <div className="main-content">
        <div className="container">
          {data && (
            <>
              <InfoComponent item={data} email={email} movieInfo={movieInfo} />
              <div className="similar-content mb-5">
                <h2>More of what you like</h2>
                <AllMovies email={email} />
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WatchMovie;
