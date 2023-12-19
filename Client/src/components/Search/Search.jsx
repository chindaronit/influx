import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SearchBarData from "../../assets/SearchBarData";
import SearchBar from "./SearchBar";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const Search = ({ email }) => {
  const [data, setData] = useState([]);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(res.data);
      console.log(data);
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
          <SearchBar placeholder="Search" data={data} />
          <div className="d-flex jc-center f-wrap m-5">
            {SearchBarData.map((item, index) => {
              return (
                <Link to={item.path} className="link" key={index}>
                  <Card
                    className="search-card f-wrap"
                    style={{ background: item.background }}
                  >
                    <h2>{item.genre}</h2>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Search;
