import React, { useState } from "react";
import PlayCircle from "@mui/icons-material/PlayCircle";
import Img from "../LadyLoadImage/Img";
import Video from "../Video/Video";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Clips = ({ clips }) => {
  const [show, setShow] = useState(null);
  const [videoId, setVideoId] = useState(null);

  return clips ? (
    <div className="clips">
      <h2>Related Clips & Videos</h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="clips-list"
      >
        {clips?.map((video, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              setVideoId(video.key);
              setShow(true);
            }}
            className="clips-swiper-slide"
          >
            <div className="thumbnail">
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                className={"img"}
              />
              <PlayCircle className="icon" />
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
    </div>
  ) : null;
};

export default Clips;
