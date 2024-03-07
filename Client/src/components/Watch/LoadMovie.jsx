import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Watch from "./Watch";
import { CircularProgress } from "@mui/material";
import Footer from "../Footer/Footer";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";

const LoadMovie = ({ handleAlert, setText }) => {
  const { media, id } = useParams();
  const { data, loading } = useFetch(`/${media}/${id}`);
  const { data: credits, loading: creditLoading } = useFetch(
    `/${media}/${id}/credits`
  );
  const { data: video, loading: videoLoading } = useFetch(
    `/${media}/${id}/videos`
  );
  const { data: similar, loading: similarLoading } = useFetch(
    `/${media}/${id}/similar`
  );
  const { data: recommended, loading: recommendedLoading } = useFetch(
    `/${media}/${id}/recommendations`
  );

  if (
    loading ||
    creditLoading ||
    videoLoading ||
    similarLoading ||
    recommendedLoading
  ) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading &&
    !creditLoading &&
    !videoLoading &&
    !similarLoading &&
    !recommendedLoading && (
      <>
        <ContentWrapper>
          <Navbar />
          <Watch
            item={data}
            crew={credits?.crew}
            cast={credits?.cast}
            video={video?.results}
            similar={similar?.results}
            recommended={recommended?.results}
            endpoint={media}
            handleAlert={handleAlert}
            id={id}
            setText={setText}
          />
          <Footer />
        </ContentWrapper>
        <SideBar handleAlert={handleAlert} setText={setText} />
      </>
    )
  );
};

export default LoadMovie;
