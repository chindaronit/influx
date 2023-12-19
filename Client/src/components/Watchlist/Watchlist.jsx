import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ShowComponent from "../Filter/ShowComponent";

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
    <div className="page">
      <NavBar email={email} />
      <div className="main-content">
        <ShowComponent
          section={section}
          email={email}
          Watchlist={true}
          data={data}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Watchlist;
