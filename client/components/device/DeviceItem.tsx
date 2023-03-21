import Image from "next/image";
import React from "react";
import cn from "classnames";
import ReactStars from "react-rating-stars-component";
import { Button } from "../other";
import basketIcon from "../../assets/images/icons/basket-btn.png";
import star from "../../assets/images/icons/star.svg";
import starHalf from "../../assets/images/icons/star-half.svg";
import starLine from "../../assets/images/icons/star-line.svg";
import { IDevice } from "../../models/IDevice";
import { useRouter } from "next/router";
import { maxStrokeLength } from "../../helpers";

interface DeviceItemProps {
  device: IDevice;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {

  const { _id, name, discount, price, rating } = device;
	const history = useRouter();

	const buyClickHandler = () => {
		history.push(`/device/${_id}`)
	}

  return (
    <div className="device-item" id="device-item">
      {discount && (
        <div className="device-item__discount discount discount--small">
          {" "}
          - {discount} %
        </div>
      )}
      <img src={process.env.NEXT_PUBLIC_API_URL + device.imgPath} alt="device__img" className="device-item__img" />
      <h5 className="device-item__title">{maxStrokeLength(name, 55)}</h5>
      <div className="device-item__rating">
        <div className="rating">
          <ReactStars
            className="react-rating"
            value={rating}
            size={15}
            edit={false}
            isHalf={true}
            filledIcon={<Image className="rating-star" src={star} alt="star" />}
            halfIcon={<Image className="rating-star" src={starHalf} alt="star" />}
            emptyIcon={<Image className="rating-star" src={starLine} alt="star" />}
          />
        </div>
      </div>
      <div className="device-item__bottom">
        <div className="price-wrapper">
          <p className={cn("price", { "old-price": discount })}>{price} ₴</p>
          {discount && (
            <p className="with-discount">
              {Math.floor(price - (price * discount) / 100)} ₴
            </p>
          )}
        </div>
        <Button className="device-item__buy" outlined onClick={buyClickHandler}>
          <Image src={basketIcon} alt="basket" className="icon" />
          <span>Купить</span>
        </Button>
      </div>
    </div>
  );
};

export default DeviceItem;
