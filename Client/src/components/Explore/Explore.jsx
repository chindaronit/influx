import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import SortByData from "../../assets/SortByData";
import Slide from "../Movies/Slide";
import FetchQueryData from "../../functions/FetchQueryData";
import FetchQueryNextPageData from "../../functions/FetchQueryNextPageData";
import { CircularProgress } from "@mui/material";
import SideBar from "../Sidebar/Sidebar";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

let filters = {};

const Explore = ({ handleAlert, setText }) => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const url = `/discover/${mediaType}?page=${pageNum}`;

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    FetchQueryData(setData, setPageNum, setLoading, url);
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    FetchQueryData(setData, setPageNum, setLoading, url);
  };

  if (!data || loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    <>
      <ContentWrapper>
        <Navbar />
        <div className="explorePage container">
          <h2 className="heading ml-4 mt-4">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </h2>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD filter"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={SortByData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD filter"
              classNamePrefix="react-select"
            />
          </div>

          {!loading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="content"
                  dataLength={data?.results?.length || []}
                  next={FetchQueryNextPageData(data, setData, setPageNum, url)}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<CircularProgress />}
                >
                  <div className="wrapper">
                    {data?.results?.map((item, index) => {
                      if (item.media_type === "person") return;
                      return (
                        <div className="item" key={index}>
                          <Slide
                            data={item}
                            endpoint={mediaType}
                            handleAlert={handleAlert}
                            setText={setText}
                          />
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              ) : (
                <span className="resultNotFound">
                  Sorry, Results not found!
                </span>
              )}
            </>
          )}
        </div>
        <Footer />
      </ContentWrapper>
      <SideBar handleAlert={handleAlert} setText={setText}/>
    </>
  );
};

export default Explore;
