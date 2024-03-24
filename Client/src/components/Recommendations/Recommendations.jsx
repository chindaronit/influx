import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Slide from "../Movies/Slide";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import { getHistoryMovies } from "../../features/Specifics/historySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecommendations } from "../../features/Recommendations/recommendationSlice";
import { fetchDataFromApi } from "../../utils/api";
import { getPlan } from "../../features/subscription/Subscription";

const Recommendations = ({ setText, handleAlert }) => {
  const { user, token, loading, success } = useSelector(
    (state) => state.authSlice
  );
  const { movies, loading: moviesLoading } = useSelector(
    (state) => state.history
  );
  const { plan, loading: SubscriptionLoading } = useSelector(
    (state) => state.subscription
  );
  const pageNum = Math.floor(Math.random() * 10) + 1;

  const [popularMovie, setPopularMovie] = useState(null);
  const [dayTrending, setDayTrending] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const popularMovieUrl = `/movie/popular?page=${pageNum}`;
  const dayTredingUrl = `/trending/tv/day?page=${pageNum}`;
  const topRatedMovieUrl = `/movie/top_rated?page=${pageNum}`;

  const { movies: recommendedMovies, loading: loadingRecommendation } =
    useSelector((state) => state.recommendation);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const moviesIdList = movies.map((item) => {
      return item.id;
    });
    dispatch(fetchRecommendations({ moviesIdList: moviesIdList }));
  }, [movies, moviesLoading]);

  const Fetch = async (url) => {
    try {
      const res = await fetchDataFromApi(url);
      if (res) {
        return res.results;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/subscription");
    };

    if (!loading) {
      if (success && !plan) {
        timeoutId = setTimeout(handleTimeout, 2000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [plan, SubscriptionLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const popularMovieData = await Fetch(popularMovieUrl);
      const dayTrendingData = await Fetch(dayTredingUrl);
      const topRatedData = await Fetch(topRatedMovieUrl);

      setPopularMovie(popularMovieData);
      setDayTrending(dayTrendingData);
      setTopRated(topRatedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/signin");
    };

    if (!loading) {
      if (success) {
        dispatch(getPlan({ email: user?.email, token: token }));
        dispatch(getHistoryMovies({ email: user?.email, token: token }));
      } else {
        timeoutId = setTimeout(handleTimeout, 5000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, token, loading, success]);

  if (
    loading &&
    !plan &&
    SubscriptionLoading &&
    loadingRecommendation &&
    !recommendedMovies &&
    !popularMovie &&
    !dayTrending &&
    !topRated
  ) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading &&
    plan &&
    !SubscriptionLoading &&
    !loadingRecommendation &&
    recommendedMovies &&
    popularMovie &&
    dayTrending &&
    topRated && (
      <>
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <div className="content-heading">
              <h1>Recommendations</h1>
            </div>

            <div className="wrapper">
              {recommendedMovies?.map((item, index) => {
                return (
                  <Slide
                    data={item}
                    endpoint={"movie"}
                    handleAlert={handleAlert}
                    setText={setText}
                    key={index}
                  />
                );
              })}
              {popularMovie?.map((item, index) => {
                return (
                  <Slide
                    data={item}
                    endpoint={"movie"}
                    handleAlert={handleAlert}
                    setText={setText}
                    key={index}
                  />
                );
              })}
              {dayTrending?.map((item, index) => {
                return (
                  <Slide
                    data={item}
                    endpoint={"movie"}
                    handleAlert={handleAlert}
                    setText={setText}
                    key={index}
                  />
                );
              })}

              {topRated?.map((item, index) => {
                return (
                  <Slide
                    data={item}
                    endpoint={"movie"}
                    handleAlert={handleAlert}
                    setText={setText}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </ContentWrapper>
        <SideBar setText={setText} handleAlert={handleAlert} />
      </>
    )
  );
};

export default Recommendations;
