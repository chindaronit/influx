import React, { useState, useEffect } from "react";
import ShowComponent from "./ShowComponent";
import axios from "axios";
import { FilterData } from "./FilterData";

const TopGenre = ({ email, section}) => {
  const [data, setData] = useState([]);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api/all");
      setData(()=>FilterData(res.data,section));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, [section]);

  return (
    <ShowComponent data={data} section={"Top "+section} email={email}></ShowComponent>
  );
};

export default TopGenre;
