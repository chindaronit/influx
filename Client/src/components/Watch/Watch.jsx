import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RelatedInfo from "./RelatedInfo";
import Banner from "./Banner";
import Cast from "./Cast";
import Clips from "./Clips";
import Movies from "../Movies/Movies";
import Seasons from "./Seasons";
import "./Watch.css";

const Watch = ({
  video,
  item,
  crew,
  cast,
  similar,
  recommended,
  endpoint,
  handleAlert,
  setText,
  id,
}) => {
  const [src, setSrc] = useState(null);
  const { url } = useSelector((state) => state.homePage);
  const [poster, setPoster] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (url && item?.backdrop_path) {
      setSrc(url?.backdrop + item?.backdrop_path);
    } else if (url && !item?.backdrop_path) {
      setSrc("/src/assets/no-background.jpg");
    }
    if (url && item.poster_path) {
      setPoster(url.poster + item?.poster_path);
    } else if (url && !item?.poster_path) {
      setPoster("/src/assets/no-poster.jpg");
    }
  }, [url, item]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const srcOrPoster = windowSize >= 1024 ? src : poster;

  return src && poster ? (
    <div className="container">
      <Banner
        totalSeasons={ parseInt(item.number_of_seasons)}
        src={src}
        item={item}
        video={video?.[0]}
        handleAlert={handleAlert}
        setText={setText}
        endpoint={endpoint}
        id={id}
      />
      {endpoint === "tv" && (
        <Seasons
          totalSeasons={parseInt(item.number_of_seasons)}
          id={id}
          src={srcOrPoster}
        />
      )}
      {<RelatedInfo item={item} crew={crew} poster={poster} />}

      <Cast cast={cast} />
      {video?.length > 0 && <Clips clips={video} />}

      <div className="watch-content">
        {similar?.length > 0 && (
          <Movies
            sectionName={"similar"}
            sectionMedia={endpoint}
            endpoint={endpoint}
            data={similar}
            handleAlert={handleAlert}
            setText={setText}
          />
        )}
        {recommended?.length > 0 && (
          <Movies
            sectionName={"recommended"}
            sectionMedia={endpoint}
            endpoint={endpoint}
            data={recommended}
            handleAlert={handleAlert}
            setText={setText}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Watch;
