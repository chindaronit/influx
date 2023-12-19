import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopGenre from "./TopGenre";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const MainComponent = ({ email }) => {
  const [section, setSection] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params.genreValue && params.genreValue !== section) {
      setSection(params.genreValue);
    }
  }, [params.genreValue, section]);

  if (!section) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="page">
      <NavBar email={email} />
      <div className="main-content">
        <TopGenre section={section} email={email} />
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;
