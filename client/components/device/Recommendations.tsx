import React from "react";
import { MainDeviceItem } from "../main";

// Import Swiper settings
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { IDevice } from "../../models/IDevice";

interface RecommendationsProps {
  title: string;
	devices: IDevice[]
}

const Recommendations: React.FC<RecommendationsProps> = ({ title, devices }) => {

  return (
    <div className="recommendations">
      <h3 className="recommendations__title">{title}</h3>
      <div className="recommendations__body">
        <Swiper
          modules={[Navigation]}
          navigation
					slidesPerView={1.35}
					breakpoints={{
						450: {
							slidesPerView: 2.35,
						},
						576: {
							slidesPerView: 3.35,
						},
						768: {
							slidesPerView: 4.35,
						},
						991: {
							slidesPerView: 5.35,
						},
						1200: {
							slidesPerView: 6.35,
						},
					}}
        >
          {devices.map((device) => {
            return (
              <SwiperSlide key={device._id}>
                <MainDeviceItem device={device} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommendations;
