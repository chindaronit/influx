import { useState, useEffect } from "react";
import Banner from "./Banner/Banner";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import axios from "axios";
import Movierow from "../components/MainContent/Movierow";
import Genre from "../assets/Genre";
import GenreMainPage from "../components/MainContent/GenreMainPage";

export default function Main({ email }) {
  const [data, setData] = useState([]);
  console.log(email);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/section/api");
      setData(res.data);
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
          <Banner section={"banner"} email={email} />
          {data.map((item, index) => {
            if (item.section === "banner" || item.section === "empty") {
              return;
            }
            return (
              <Movierow email={email} section={item.section} key={index} />
            );
          })}
          {Genre.map((item, index) => {
            return (
              <GenreMainPage email={email} genre={item.genre} key={index} />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}
