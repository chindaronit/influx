import React from "react";
import Movies from "../Movies/Movies";
import useFetch from "../../hooks/useFetch";

const Section = ({ item, handleAlert, setText }) => {
  const { data, loading } = useFetch(item.path);

  return (
    !loading && (
      <Movies
        sectionName={item.sectionName}
        sectionMedia={item.sectionMedia}
        data={data.results}
        key={item.id}
        endpoint={item.endpoint}
        handleAlert={handleAlert}
        setText={setText}
        path={item.path}
      />
    )
  );
};

export default Section;
