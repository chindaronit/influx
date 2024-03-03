import React from "react";
import Banner from "../Banner/Banner";
import useFetch from "../../hooks/useFetch";
import SectionData from "../../assets/SectionData";
import Section from "../Section/Section";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Specifics from "../Specifics/Specifics";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";

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
    <>
      <ContentWrapper>
        <Navbar />
        <div className="container">
          <Banner
            data={data?.results}
            endpoint={"tv"}
            url={url}
            genres={genres}
            handleAlert={handleAlert}
            setText={setText}
          />
        </div>
        <div className="container">
          <Specifics />
        </div>
        <div className="container">
          <div className="mt-2">
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
        </div>

        <Footer />
      </ContentWrapper>
      <Sidebar />
    </>
  );
};

export default Home;
