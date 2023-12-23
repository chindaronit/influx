import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Slide = ({
  data,
  endpoint,
  url,
  genres,
  handleAlert,
  setText,
}) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (url.backdrop) {
      setSrc(url.backdrop + data.backdrop_path);
    }
  }, [data]);

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/watchlist/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "ronitchinda100@gmail.com",
          id: data.id,
          media_type: endpoint,
        }),
      });

      if (res.status === 200) {
        setText("Added to Watchlist");
        handleAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return src ? (
    <div>
      <img src={src} alt={data.title} />
      <div className="banner-info-container">
        <div className="info">
          <h1>{data.name || data.title}</h1>
          <h5 className="overview">{data.overview}</h5>
          <div className="d-flex jc-center blue">
            <h3>{dayjs(data.release_date).format("MMM D,YYYY")}</h3>
            <h3>|</h3>
            {data.genre_ids.slice(0, 2).map((item, index, array) => {
              if (!genres[item]?.name) return null;
              return (
                <React.Fragment key={index}>
                  <h3>{genres[item].name}</h3>
                  {index < array.length - 1 && <h3>|</h3>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="banner-btn-container">
          <Link to={`/${endpoint}/${data.id}`}>
            <Button variant="contained" className="watch-btn">
              WATCH NOW
            </Button>
          </Link>
          <div className="add-btn">
            <IconButton onClick={handleClick}>
              <AddIcon className="btn" />
              <div className="add-to-watchlist">Add to Watchlist</div>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Slide;
