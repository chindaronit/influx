import React, { useState } from "react";
import PlayCircle from "@mui/icons-material/PlayCircle";
import Img from "../LadyLoadImage/Img";
import Video from "../Video/Video";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Video.css";

const Clips = ({ clips }) => {
  const [show, setShow] = useState(null);
  const [videoId, setVideoId] = useState(null);

  return clips ? (
    <>
      <h2 className="starring">Related Clips & Videos</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="clips-list"
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {clips?.map((video, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              setVideoId(video.key);
              setShow(true);
            }}
          >
            <div className="thumbnail">
              <Img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                className={"img"}
              />
              <PlayCircle />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Video
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  ) : null;
};

export default Clips;
