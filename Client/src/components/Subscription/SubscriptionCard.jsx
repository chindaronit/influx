import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const SubscriptionCard = ({
  email,
  data,
  upgrade,
  dateAdded,
  handleAlert,
  setText,
}) => {
  const [noOfDaysLeft, setNoOfDaysLeft] = useState(null);

  useEffect(() => {
    // Convert dateAdded string to a Date object
    const dateAddedObject = new Date(dateAdded);

    // Calculate the expiration date based on plan validity
    const expirationDate = new Date(dateAddedObject);
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    // Calculate the number of milliseconds between the current date and the expiration date
    const timeDifference = expirationDate - new Date();

    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Update the state with the number of days left
    setNoOfDaysLeft(daysLeft);
  }, [dateAdded]);

  const handleUpgrade = async (email, plan, dateUpgraded) => {
    try {
      const res = await fetch("http://localhost:5000/subscription/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          plan: plan,
          dateUpgraded: dateUpgraded,
        }),
      });

      if (res.status === 200) {
        window.location.reload();
        setText("Plan Upgraded!");
        handleAlert();
      } else {
        window.alert("Error");
      }
    } catch (error) {
      // Handle fetch errors here
      console.error(error);
    }
  };

  return (
    <div className="subscription-card-container">
      {data?.map((item, index) => {
        return (
          <div
            className={"subscription-card"}
            style={{
              borderTop: "2px Solid " + item.color,
              boxShadow: `0px 2px 2px 2px ${item.color}, 0 4px 16px 0 ${item.color}`,
            }}
            key={index}
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

            {upgrade && (
              <div className="d-flex jc-between">
                <h3 style={{ color: item.color }}>{item.price} Monthly</h3>
                <Button
                  variant="contained"
                  className="btn"
                  style={{ backgroundColor: item.color }}
                  onClick={() => {
                    const dateUpgraded = new Date();
                    setText("PLAN UPGRADED");
                    handleAlert();
                  }}
                >
                  Upgrade
                </Button>
              </div>
            )}

            {!upgrade && (
              <>
                {noOfDaysLeft < 0 ? (
                  <h3 style={{ color: item.color }}>Expired</h3>
                ) : (
                  <h3 style={{ color: item.color }}>
                    Expires in {noOfDaysLeft}{" "}
                    {noOfDaysLeft === 1 ? "day" : "days"}
                  </h3>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionCard;
