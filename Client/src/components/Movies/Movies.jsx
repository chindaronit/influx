import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Slide from "./Slide";
import { Link } from "react-router-dom";

const Movies = ({
  sectionName,
  sectionMedia,
  data,
  endpoint,
  handleAlert,
  setText,
  path
}) => {
  return (
    <div className="row-container">
      <div className="heading">
        <div className="text">{sectionName + " " + sectionMedia}</div>
        <Link className="link" to={`/section${path}`}>
          <div className="show-all">Show All</div>
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          928: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="movie-list"
      >
        {data?.map((item, index) => {
          if (item.backdrop_path) {
            return (
              <SwiperSlide key={index}>
                <Slide
                  data={item}
                  endpoint={endpoint}
                  handleAlert={handleAlert}
                  setText={setText}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default Movies;
