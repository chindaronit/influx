import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import "/src/assets/main/banner.css";
import MovieInfo from "./MovieInfo";

const Banner = ({ email, section }) => {
  const [data, setData] = useState([]);

  const getAPIData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies/api", {
        params: { section: section },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="slider-container">
      <Swiper
        style={{
          "--swiper-pagination-color": "#1976d2",
          "--swiper-pagination-bullet-inactive-color": "#fff",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "5px",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.src} alt={item.alt} />
            <MovieInfo
              itemId={item.itemId}
              description={item.description}
              genre={item.genre}
              duration={item.duration}
              title={item.title}
              rating={item.rating}
              email={email}
              year={item.year}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
