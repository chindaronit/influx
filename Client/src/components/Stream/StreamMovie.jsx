import React, { useEffect } from "react";
import "./Stream.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { getComments } from "../../features/Comments/commentSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GetContent from "./GetContent";
import { getPlan } from "../../features/subscription/Subscription";
import { addToHistory } from "../../features/Specifics/historySlice";

const StreamMovie = () => {
  const { media, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, loading, success } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      navigate("/signin");
    };

    if (!loading) {
      if (success) {
        dispatch(getPlan({ email: user?.email, token: token }));
        dispatch(getComments({ media_type: media, id, token }));
        dispatch(
          addToHistory({
            media_type: media,
            id,
            token,
            email: user?.email,
          })
        );
      } else {
        timeoutId = setTimeout(handleTimeout, 5000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, token, loading, success]);

  if (loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    !loading && (
      <GetContent
        media_type={media}
        id={id}
        token={token}
        user={user}
      />
    )
  );
};

export default StreamMovie;
