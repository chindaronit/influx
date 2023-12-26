import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { upgradePlan } from "../../features/subscription/Subscription";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";

const SubscriptionCard = ({ item, handleAlert, setText, token, email }) => {
  const { plan, loading } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading && (
      <div
        className={"subscription-card"}
        style={{
          borderTop: "2px Solid " + item.color,
          boxShadow: `0px 2px 2px 2px ${item.color}, 0 4px 16px 0 ${item.color}`,
        }}
      >
        <div className="plan-name" style={{ backgroundColor: item.color }}>
          <h2>{item.plan}</h2>
        </div>

        <div className="d-flex jc-center mb-2">
          <item.quality className="quality-icon" />
          <h3 className="quality">Quality</h3>
        </div>

        <ul>
          {item.benefits.map((benefits, iconIndex) => (
            <h4 style={{ color: item.color }} key={iconIndex}>
              <li className="benefits">{benefits}</li>
            </h4>
          ))}
        </ul>

        <h3 className="mt-2" style={{ textAlign: "center" }}>
          No of Devices - {item.devices}
        </h3>

        <ul className="d-flex jc-center mb-2">
          {item?.icons.map((icon, iconIndex) => (
            <li className="icon" key={iconIndex}>
              {React.cloneElement(icon, {
                style: { fontSize: "50px" },
              })}
            </li>
          ))}
        </ul>

        {plan?.plan === item.plan ? (
          <h3 className="mb-2">
            Upgraded On : {dayjs(plan.dateUpgraded).format("MMM D,YYYY")}
          </h3>
        ) : (
          <></>
        )}

        <div className="d-flex jc-between">
          <h3 style={{ color: item.color }}>{item.price} Monthly</h3>
          {plan?.plan === item.plan ? (
            <h3>
              <Button
                variant="contained"
                className="btn"
                style={{ backgroundColor: item.color }}
              >
                Current Plan
              </Button>
            </h3>
          ) : (
            <Button
              variant={plan ? "contained" : "disabled"}
              className="btn"
              style={{ backgroundColor: item.color }}
              onClick={() => {
                dispatch(
                  upgradePlan({
                    email: email,
                    plan: item.plan,
                    dateUpgraded: new Date(),
                    token: token,
                  })
                );
                setText("Plan Upgraded!");
                handleAlert();
              }}
            >
              Upgrade
            </Button>
          )}
        </div>
      </div>
    )
  );
};

export default SubscriptionCard;
