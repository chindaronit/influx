import React, { useState, useEffect} from "react";
import WatchMovie from "./WatchMovie";
import { useParams } from "react-router-dom";

const LoadMovie = ({ email }) => {
  const [itemId, setItemId] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id && params.id !== itemId) {
      setItemId(params.id);
    }
  }, [itemId,params.id]); 

  return <WatchMovie itemId={itemId} email={email} />;
};

export default LoadMovie;
