import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import Img from "../LadyLoadImage/Img";

const Cast = ({ cast }) => {
  const { url } = useSelector((state) => state.homePage);

  return (
    <div className="ml-2">
      <h2 className="mb-2 text bold">Starring</h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
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
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="cast-list"
      >
        {cast?.map((item, index) => {
          const src = item.profile_path
            ? url.profile + item.profile_path
            : "/src/assets/avatar.jpg";
          return (
            <SwiperSlide key={index}>
              <div className="cast-item">
                <div className="profile">
                  <Img src={src} alt={item.name} />
                </div>
                <div className="name">{item.name}</div>
                <div className="character">{`(${item.character})`}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Cast;
