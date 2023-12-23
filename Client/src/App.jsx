import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  getApiConfiguration,
  getGenres,
} from "./features/homePage/homePageSlice";
import { useDispatch } from "react-redux";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import LoadMovie from "./components/Watch/LoadMovie";
import ViewAll from "./components/Search/ViewAll";
import Explore from "./components/Explore/Explore";
import Subscription from "./components/Subscription/Subscription";
import Added from "./components/Watchlist/Added";
import Genre from "./components/Filters/Genre";
import Trending from "./components/Filters/Trending";
import Upcoming from "./components/Filters/Upcoming";
import TopRated from "./components/Filters/TopRated";
import TopRatedTv from "./components/Filters/TopRatedTv";
import TrendingTv from "./components/Filters/TrendingTv";
import Popular from "./components/Filters/Popular";
import PopularTv from "./components/Filters/PopularTv";
import NowPlaying from "./components/Filters/NowPlaying";
import AiringTodayTv from "./components/Filters/AiringTodayTv";
import LoadWatchlist from "./components/Watchlist/LoadWatchlist";

function App() {
  const [showWatchListAlert, setShowWatchListAlert] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [text, setText] = useState(null);

  const handleAlert = () => {
    setShowWatchListAlert(true);

    // Clear the previous timeout, if any
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      setShowWatchListAlert(false);
    }, 5000);

    // Save the timeoutId for potential cleanup
    setTimeoutId(newTimeoutId);
  };

  const dispatch = useDispatch();

  const fetchApiConfig = async () => {
    const data = await fetchDataFromApi("/configuration");
    const url = {
      backdrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  };

  const fetchApiGenres = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let Genres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    // promise.all return to data when genre from both endpoints is present
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (Genres[item.id] = item));
    });

    dispatch(getGenres(Genres));
  };

  useEffect(() => {
    fetchApiConfig();
    fetchApiGenres();
  }, []);

  return (
    <Router>
      {showWatchListAlert && <Added text={text} />}
      <ContentWrapper>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home handleAlert={handleAlert} setText={setText} />}
          />
          <Route path="/search" element={<Search />} />
          <Route
            path="/search/:query"
            element={<ViewAll handleAlert={handleAlert} setText={setText} />}
          />
          <Route
            path="/:media/:id"
            element={<LoadMovie handleAlert={handleAlert} setText={setText} />}
          />
          <Route
            path="/explore/:mediaType"
            element={<Explore handleAlert={handleAlert} setText={setText} />}
          />
          <Route
            path="/subscription"
            element={
              <Subscription handleAlert={handleAlert} setText={setText} email="ronitchinda100@gmail.com"/>
            }
          />
          <Route
            path="/watchlist"
            element={
              <LoadWatchlist
                email="ronitchinda100@gmail.com"
                handleAlert={handleAlert}
                setText={setText}
              />
            }
          />
          <Route
            path="/filter"
            element={<Genre handleAlert={handleAlert} setText={setText} />}
          />
          <Route
            path="/section/trending/movie/week"
            element={<Trending handleAlert={handleAlert} setText={setText} />}
          />
          <Route
            path="/section/movie/top_rated"
            element={<TopRated handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/movie/upcoming"
            element={<Upcoming handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/movie/popular"
            element={<Popular handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/tv/popular"
            element={<PopularTv handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/movie/now_playing"
            element={<NowPlaying handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/tv/airing_today"
            element={
              <AiringTodayTv handleAlert={handleAlert} setText={setText} />
            }
          />

          <Route
            path="/section/tv/top_rated"
            element={<TopRatedTv handleAlert={handleAlert} setText={setText} />}
          />

          <Route
            path="/section/trending/tv/week"
            element={<TrendingTv handleAlert={handleAlert} setText={setText} />}
          />
        </Routes>

        <Footer />
      </ContentWrapper>

      <Sidebar />
    </Router>
  );
}

export default App;
