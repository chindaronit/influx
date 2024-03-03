import React, { useEffect } from "react";
import Liked from "./Liked";
import { useDispatch, useSelector } from "react-redux";
import { getLikedMovies } from "../../features/Specifics/likedSlice";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SideBar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const LoadLiked = ({ handleAlert, setText }) => {
  const dispatch = useDispatch();
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
      if (success) {
        dispatch(getLikedMovies({ email: user?.email, token: token }));
      } else {
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
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <div className="content-heading">
              <h1>Liked</h1>
            </div>
            <Liked handleAlert={handleAlert} setText={setText} />
          </div>
          <Footer />
        </ContentWrapper>
        <SideBar handleAlert={handleAlert} setText={setText} />
      </>
    )
  );
};

export default LoadLiked;
