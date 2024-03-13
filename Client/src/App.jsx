import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import LoadMovie from "./components/Watch/LoadMovie";
import ViewAll from "./components/Search/ViewAll";
import Explore from "./components/Explore/Explore";
import Subscription from "./components/Subscription/Subscription";
import Added from "./components/Specifics/Added";
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
import LoadWatchlist from "./components/Specifics/Watchlist/LoadWatchlist";
import LoadFavourite from "./components/Specifics/Favourite/LoadFavourite";
import LoadLiked from "./components/Specifics/Liked/LoadLiked";
import LoadHistory from "./components/Specifics/History/LoadHistory";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import { getTokenFromCookie } from "./features/auth/authSlice";
import FetchApiConfig from "./functions/FetchApiConfig";
import FetchApiGenres from "./functions/FetchApiGenres";
import PageNotFound from "./components/404/PageNotFound";
import Profile from "./components/Profile/Profile";
import Stream from "./components/Stream/Stream";
import "./App.css";

function App() {
  const [showWatchListAlert, setShowWatchListAlert] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [text, setText] = useState(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getTokenFromCookie());
    FetchApiConfig(dispatch);
    FetchApiGenres(dispatch);
  }, []);

  return (
    <Router>
      {showWatchListAlert && <Added text={text} />}

      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={<Home handleAlert={handleAlert} setText={setText} />}
        />

        <Route path="/profile" element={<Profile />} />

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
          element={<Subscription handleAlert={handleAlert} setText={setText} />}
        />

        <Route
          path="/watchlist"
          element={
            <LoadWatchlist handleAlert={handleAlert} setText={setText} />
          }
        />

        <Route
          path="/liked"
          element={<LoadLiked handleAlert={handleAlert} setText={setText} />}
        />

        <Route
          path="/favourite"
          element={
            <LoadFavourite handleAlert={handleAlert} setText={setText} />
          }
        />

        <Route
          path="/history"
          element={<LoadHistory handleAlert={handleAlert} setText={setText} />}
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

        <Route
          path="/stream/:media/:id/:season/:episode"
          element={<Stream handleAlert={handleAlert} setText={setText} />}
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
