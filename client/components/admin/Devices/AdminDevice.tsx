import Image from "next/image";
import React from "react";
import ReactStars from "react-rating-stars-component";
import star from "../../../assets/images/icons/star.svg";
import starHalf from "../../../assets/images/icons/star-half.svg";
import starLine from "../../../assets/images/icons/star-line.svg";
import { IDevice } from "../../../models/IDevice";
import { Button } from "../../other";

interface AdminDeviceProps {
  device: IDevice;
  index: number;
}

const AdminDevice: React.FC<AdminDeviceProps> = ({ device, index }) => {
  const { name, rating, price, discount, imgPath } = device;

  return (
    <div className="admin-device">
      <span className="admin-device__num">{index}</span>
      <img
        src={process.env.NEXT_PUBLIC_API_URL + imgPath}
        alt="admin-device-img"
        className="admin-device__img"
      />
      <h5 className="admin-device__name">{name}</h5>
      <div className="admin-device__rating">
        <div className="rating">
          <ReactStars
            className="react-rating"
            value={rating}
            size={15}
            edit={false}
            isHalf={true}
            filledIcon={<Image className="rating-star" src={star} alt="star" />}
            halfIcon={
              <Image className="rating-star" src={starHalf} alt="star" />
            }
            emptyIcon={
              <Image className="rating-star" src={starLine} alt="star" />
            }
          />
        </div>
      </div>
      <div className="admin-device__price">{price}</div>
      <div className="admin-device__discount">{discount}</div>
      <div className="admin-device__btn">
        <Button outlined onClick={() => {}}>
          Опції
        </Button>
      </div>
    </div>
  );
};

export default AdminDevice;
