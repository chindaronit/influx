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
    <>
      <h2 className="starring">Starring</h2>
      <Swiper
        slidesPerView={9}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="cast-list"
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 9,
          },
        }}
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
    </>
  );
};

export default Cast;
