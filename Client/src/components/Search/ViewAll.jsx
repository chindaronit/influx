import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import Slide from "../Movies/Slide";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchQueryNextPageData from "../../functions/FetchQueryNextPageData";
import FetchQueryData from "../../functions/FetchQueryData";
import { CircularProgress } from "@mui/material";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const ViewAll = ({ handleAlert, setText }) => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  let url = `/search/multi?query=${query}&page=${pageNum}`;

  useEffect(() => {
    setPageNum(1);
    FetchQueryData(setData, setPageNum, setLoading, url);
  }, [query]);

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
            <h2 className="text bold heading ml-4 mt-2">
              Search Result for {`'${query}'`}
            </h2>

            {data?.results?.length > 0 ? (
              <>
                <InfiniteScroll
                  className="content"
                  dataLength={data?.results?.length || []}
                  next={() => {
                    if (pageNum) {
                      FetchQueryNextPageData(data, setData, setPageNum, url);
                      url = `/search/multi?query=${query}&page=${pageNum}`;
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
                            endpoint={item.media_type}
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
        <SideBar setText={setText} handleAlert={handleAlert}/>
      </>
    )
  );
};

export default ViewAll;
