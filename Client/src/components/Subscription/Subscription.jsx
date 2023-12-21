import React, { useState, useEffect } from "react";
import SubscriptionDetail from "../../assets/SubscriptionDetail";
import SubscriptionCard from "./SubscriptionCard";
import axios from "axios";
import "./style.css";

const Subscription = ({email, handleAlert, setText }) => {
  const [myPlan, setMyPlan] = useState([]);
  const [dateAdded, setDateAdded] = useState(null);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/subscription/api", {
        params: { email: email },
      });

      const response = res.data[0];
      const subscribedPlan = response.plan;
      setDateAdded(response.dateUpgraded);
      const myplans = [];

      if (!subscribedPlan) {
        setMyPlan([]);
      } else {
        const plan = SubscriptionDetail.find(
          (item) => item.plan === subscribedPlan
        );
        if (plan) {
          myplans.push(plan);
        }
        setMyPlan(myplans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
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
      {myPlan.length != 0 && (
        <>
          <h2 className="plan-heading">My Plans</h2>
          <SubscriptionCard
            data={myPlan}
            upgrade={false}
            dateAdded={dateAdded}
            handleAlert={handleAlert}
            setText={setText}
            key="0"
          />
          <h2 className="plan-heading">Other Plans</h2>
        </>
      )}
      <SubscriptionCard
        data={SubscriptionDetail}
        upgrade={true}
        email={email}
        handleAlert={handleAlert}
        setText={setText}
        key="1"
      />
    </div>
  );
};

export default Subscription;
