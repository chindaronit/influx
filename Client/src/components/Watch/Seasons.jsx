import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import SeasonSlide from "./SeasonSlide";
import { fetchDataFromApi } from "../../utils/api";

const Seasons = ({ totalSeasons, id, src }) => {
  const [season, setSeason] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `/tv/${id}/season/${season}`;

  // Convert number_of_seasons to a number
  const numberOfSeasons = totalSeasons;

  // Create an array of numbers from 1 to numberOfSeasons
  const seasons = Array.from(
    { length: numberOfSeasons },
    (_, index) => index + 1
  );

  const handleSelect = (e) => {
    setSeason(e.target.value);
  };

  const fetchEpisodes = async (url) => {
    try {
      const res = await fetchDataFromApi(url);
      setLoading(false);
      setData(res.episodes);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchEpisodes(url);
  }, [season]);

  return (
    !loading && (
      <div className="season-select">
        <select name="seasons" id="seasons" onChange={handleSelect}>
          {seasons.map((season, index) => (
            <option value={season} key={index}>
              Season {season}
            </option>
          ))}
        </select>
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="movie-list"
        >
          {data?.map((episode, index) => {
            return (
              <SwiperSlide key={index}>
                <SeasonSlide episode={episode} src={src} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
};

export default Seasons;
