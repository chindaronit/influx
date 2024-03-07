import React, { useEffect } from "react";
import CenterWrapper from "../ContentWrapper/CenterWrapper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "../Footer/Footer";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Profile.css";
import { Link } from "react-router-dom";
import Bar from "./Bar";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Profile = () => {
  const { user, token, loading, success } = useSelector(
    (state) => state.authSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/signin");
    };

    if (!loading) {
      if (!success) {
        timeoutId = setTimeout(handleTimeout, 5000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, token, loading, success]);

  if (loading || !success) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading &&
    token &&
    user &&
    user?.email && (
      <>
        <Bar />
        <CenterWrapper>
          <div className="container mv-1 pv-2">
            <center>
              <AccountCircleIcon className="user-icon" />
            </center>
            <div className="profile-details">
              <div className="fieldset">
                <div className="legend">Name</div>
                <input type="text" value={user.name} disabled />
              </div>
              <div className="fieldset">
                <div className="legend">DOB</div>
                <input
                  type="text"
                  value={dayjs(user.dob).format("MMM D,YYYY")}
                  disabled
                />
              </div>
              <div className="fieldset">
                <div className="legend">Email</div>
                <input type="text" value={user.email} disabled />
              </div>
              <div className="fieldset">
                <div className="legend">Password</div>
                <input type="text" value="******" disabled />
              </div>
            </div>
            <div className="edit-icon">
              <EditIcon />
            </div>
          </div>
          <div className="container mv-1 pv-2">
            <h3 className="profile-text">Subscription</h3>
            <div className="profile-item d-flex jc-between">
              <div>Plan</div>
              <div>Basic</div>
            </div>
            <Link to={"/subscription"} className="link">
              <div className="explore">Explore</div>
            </Link>
          </div>
          <div className="container mv-1 pv-2">
            <h3 className="profile-text">Specifics</h3>
            <Link to={"/watchlist"} className="link">
              <div className="profile-item d-flex jc-between">
                <div>Watchlist</div>
                <div>
                  <OpenInNewIcon />
                </div>
              </div>
            </Link>
            <Link to={"/history"} className="link">
              <div className="profile-item d-flex jc-between">
                <div>Watch History</div>
                <div>
                  <OpenInNewIcon />
                </div>
              </div>
            </Link>
            <Link to={"/liked"} className="link">
              <div className="profile-item d-flex jc-between">
                <div>Liked Content</div>
                <div>
                  <OpenInNewIcon />
                </div>
              </div>
            </Link>
            <Link to={"/favourites"} className="link">
              <div className="profile-item d-flex jc-between">
                <div>Favourites</div>
                <div>
                  <OpenInNewIcon />
                </div>
              </div>
            </Link>
          </div>
        </CenterWrapper>
        <Footer />
      </>
    )
  );
};

export default Profile;
