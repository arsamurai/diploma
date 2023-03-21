import React from "react";
import Image from "next/image";
import image from "../../../assets/images/default.jpeg";

// Import Swiper settings
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

interface MainSliderProps {
  images?: [];
}

const MainSlider: React.FC<MainSliderProps> = ({}) => {
  return (
    <div className="slider main-slider">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        effect={"fade"}
        navigation
        // autoplay={{
        //   delay: 11000,
        //   disableOnInteraction: true,
        // }}
      >
        <SwiperSlide>
          <Image src={image} alt="image" className="image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={image} alt="image" className="image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={image} alt="image" className="image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlider;
