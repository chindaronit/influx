import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import dayjs from "dayjs";

const LoadComments = ({ comments }) => {
  return (
    <ul className="rating-list">
      {comments?.map((item, index) => {
        return (
          <li className="rating-item" key={index}>
            <div className="rating-user-icon">
              <AccountCircleIcon />
            </div>
            <div className="rating-content">
              <div className="rating-user-info">
                <div className="user-name">{item.user_name}</div>
                <div className="comment-time">
                  {dayjs(item.time).format("MMM D,YYYY")}
                </div>
              </div>
              <div className="rating-user-comment">{item.comment}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LoadComments;
