import React, { useEffect } from "react";
import "./style.css";
import SubscriptionDetail from "../../assets/SubscriptionDetail";
import SubscriptionCard from "./SubscriptionCard";
import {useDispatch} from "react-redux";
import { getPlan } from "../../features/subscription/Subscription";

const Subscription = ({ email, handleAlert, setText }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlan(email));
  }, []);

  return (
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
              email={email}
              handleAlert={handleAlert}
              setText={setText}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;
