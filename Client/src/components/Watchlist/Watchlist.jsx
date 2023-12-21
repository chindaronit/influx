import React, { useState, useEffect } from "react";
import axios from "axios";
import Slide from "../Movies/Slide";


const Watchlist = ({ section, email }) => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/watchlist/api", {
        params: { email: email },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="container">
      <div className="content-heading">
        <h1>Watchlist</h1>
      </div>
      <div className="wrapper">
        {data.map((item, index) => {
          return <div className="item" key={index}></div>;
        })}
      </div>
    </div>
  );
};

export default Watchlist;
