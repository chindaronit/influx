import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

const Banner = ({
  data,
  endpoint,
  url,
  genres,
  handleAlert,
  setText,
}) => {
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#1976d2",
        "--swiper-pagination-bullet-inactive-color": "#fff",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "10px",
        "--swiper-pagination-bullet-horizontal-gap": "5px",
      }}
      spaceBetween={20}
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
      className="banner"
    >
      {data?.map((item, index) => {
        if (!item.backdrop_path) return;
        return (
          <SwiperSlide key={index}>
            <Slide
              data={item}
              endpoint={endpoint}
              url={url}
              genres={genres}
              handleAlert={handleAlert}
              setText={setText}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
