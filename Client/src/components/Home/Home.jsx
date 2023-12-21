import React from "react";
import "./style.css";
import Banner from "../Banner/Banner";
import useFetch from "../../hooks/useFetch";
import SectionData from "../../assets/SectionData";
import Section from "../Section/Section";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Home = ({ handleAlert, setText }) => {
  const { data, loading } = useFetch("/trending/tv/day");
  const { url, genres } = useSelector((state) => state.homePage);

  if (loading || !url.backdrop || !genres || !data) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    <div className="container">
      <Banner
        data={data?.results}
        endpoint={"tv"}
        url={url}
        genres={genres}
        handleAlert={handleAlert}
        setText={setText}
      />
      {SectionData.map((item) => {
        return (
          <Section
            item={item}
            key={item.id}
            handleAlert={handleAlert}
            setText={setText}
          />
        );
      })}
    </div>
  );
};

export default Home;
