import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowComponent from "../Filter/ShowComponent";
import { SortLatest } from "../Filter/SortLatest";

const SectionComponent = ({ email, section }) => {
  const [data, setData] = useState([]);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api", {
        params: { section: section },
      });

      setData(() => SortLatest(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, [section]);

  return <ShowComponent email={email} section={section} data={data} />;
};

export default SectionComponent;
