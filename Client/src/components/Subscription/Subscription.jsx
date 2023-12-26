import React, { useEffect } from "react";
import "./style.css";
import SubscriptionDetail from "../../assets/SubscriptionDetail";
import SubscriptionCard from "./SubscriptionCard";
import { useDispatch, useSelector } from "react-redux";
import { getPlan } from "../../features/subscription/Subscription";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Footer from "../Footer/Footer";
import { CircularProgress } from "@mui/material";

const Subscription = ({ handleAlert, setText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (!loading) {
      if (!token || !user || !user?.email) {
        navigate("/signin");
      } else {
        dispatch(getPlan({ email: user?.email, token: token }));
      }
    }
  }, [user, token, loading]);

  if (loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading &&
    user &&
    token &&
    user?.email && (
      <>
        <ContentWrapper>
          <Navbar />
          <div className="container">
            <div
              className="content-heading"
              style={{
                background:
                  "linear-gradient(90deg, rgba(23,20,79,1) 0%, rgba(230,255,193,1) 0%, rgba(31,120,43,1) 100%",
              }}
            >
              <h1>Subscription Plans</h1>
            </div>
            <div className="subscription-card-container">
              {SubscriptionDetail.map((item, index) => {
                return (
                  <SubscriptionCard
                    item={item}
                    handleAlert={handleAlert}
                    setText={setText}
                    key={index}
                    token={token}
                    email={user?.email}
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </ContentWrapper>
        <Sidebar setText={setText} handleAlert={handleAlert} />
      </>
    )
  );
};

export default Subscription;
