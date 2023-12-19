import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionComponent from "./SectionComponent";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Showallfromsection = ({ email }) => {
  const [section, setSection] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params.sectionValue && params.sectionValue !== section) {
      setSection(params.sectionValue);
    }
  }, [params.sectionValue, section]);

  if (!section) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="page">
      <NavBar email={email} />
      <div className="main-content">
        <SectionComponent section={section} email={email} />
        <Footer />
      </div>
    </div>
  );
};

export default Showallfromsection;
