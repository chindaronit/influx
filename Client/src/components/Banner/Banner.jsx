import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

const Banner = ({ data, endpoint, url, genres, handleAlert, setText }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
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
