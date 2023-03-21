import React, { useState } from "react";

// Import Swiper settings
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface DeviceSliderProps {
  images: string;
}

const DeviceSlider: React.FC<DeviceSliderProps> = ({images}) => {
  const [controlledSwiper, setControlledSwiper] = useState(undefined);

  return (
    <div className="slider device-slider">
      <div className="device-slider__top">
        <Swiper
          modules={[Navigation, Controller]}
          slidesPerView={1}
          effect={"fade"}
          navigation
          controller={{ control: controlledSwiper }}
        >
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="device-slider__bottom">
        <Swiper
          modules={[Navigation, Controller]}
          slidesPerView={4}
          navigation
          watchSlidesProgress
          onSwiper={(swiper) => setControlledSwiper}
        >
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={process.env.NEXT_PUBLIC_API_URL + images} alt="device"  className="device-image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default DeviceSlider;
