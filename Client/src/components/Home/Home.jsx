import React from "react";
import Banner from "../Banner/Banner";
import useFetch from "../../hooks/useFetch";
import SectionData from "../../assets/SectionData";
import Section from "../Section/Section";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Footer from "../Footer/Footer";
import SideBar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

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

        <Footer />
      </ContentWrapper>
      <SideBar handleAlert={handleAlert} setText={setText}/>
    </>
  );
};

export default Home;
