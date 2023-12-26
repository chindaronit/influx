import React, { useEffect, useState } from "react";
import FetchQueryData from "../../functions/FetchQueryData";
import FetchQueryNextPageData from "../../functions/FetchQueryNextPageData";
import { CircularProgress } from "@mui/material";
import Slide from "../Movies/Slide";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SideBar from "../Sidebar/Sidebar";

const Upcoming = ({ handleAlert, setText }) => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre");
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  let url = `/movie/upcoming?page=${pageNum}`;

  useEffect(() => {
    console.log(genre);
    setPageNum(1);
    FetchQueryData(setData, setPageNum, setLoading, url);
  }, []);

  if (loading && !data) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading && (
      <>
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <h2 className="heading text bold ml-4 mt-4">Upcoming Movies</h2>
            {data?.results?.length > 0 ? (
              <>
                <InfiniteScroll
                  className="content"
                  dataLength={data?.results?.length || []}
                  next={() => {
                    if (pageNum) {
                      FetchQueryNextPageData(data, setData, setPageNum, url);
                    }
                  }}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<CircularProgress />}
                >
                  <div className="wrapper">
                    {data?.results.map((item, index) => {
                      if (item.media_type === "person") return;
                      return (
                        <div className="item" key={index}>
                          <Slide
                            data={item}
                            endpoint={"movie"}
                            handleAlert={handleAlert}
                            setText={setText}
                          />
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </div>
          <Footer />
        </ContentWrapper>
        <SideBar handleAlert={handleAlert} setText={setText} />
      </>
    )
  );
};

export default Upcoming;
