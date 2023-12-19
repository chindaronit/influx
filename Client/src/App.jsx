import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Watchlist from "./components/Watchlist/Watchlist";
import Subscription from "./components/Subscription/Subscription";
import Main from "./components/MainPage";
import Search from "./components/Search/Search";
import Showallfromsection from "./components/MainContent/Showallfromsection";
import MainComponent from "./components/Filter/MainComponent";
import LatestRelease from "./components/Filter/LatestRelease";
import TopRated from "./components/Filter/TopRated";
import LoadMovie from "./components/Watch/LoadMovie";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const email = location.state?.email || "";
  
  return (
    <Routes>
      <Route path="" element={<Main email={email} />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/search" element={<Search email={email} />} />
      <Route path="/section/latest" element={<LatestRelease email={email} />} />

      <Route path="/section/toprated" element={<TopRated email={email} />} />

      <Route
        path="/section/:sectionValue"
        element={<Showallfromsection email={email} />}
      />

      <Route
        path="/section/filter/:genreValue"
        element={<MainComponent email={email} />}
      />

      <Route
        path="/watchlist"
        element={<Watchlist section="My Watchlist" email={email} />}
      />
      <Route
        path="/subscription"
        element={<Subscription section="Subscription Plans" email={email} />}
      />
      <Route path="/watch/:id" element={<LoadMovie email={email} />} />
    </Routes>
  );
}

export default App;
