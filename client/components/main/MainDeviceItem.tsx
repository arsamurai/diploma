import classNames from "classnames";
import Image from "next/image";
import React from "react";
import imageExample from "../../assets/images/default.jpeg";
import cn from "classnames";
import Link from "next/link";
import { IDevice } from "../../models/IDevice";
import { maxStrokeLength } from "../../helpers";

interface MainDeviceItemProps {
  device: IDevice;
}

const MainDeviceItem: React.FC<MainDeviceItemProps> = ({ device }) => {
  const { _id, imgPath, name, price, discount } = device;

  return (
    <Link
      href={`/device/${_id}`}
      className="main-device-item"
      id="main-device-item"
    >
      <div className="main-device-item__img">
        <img src={process.env.NEXT_PUBLIC_API_URL + imgPath} alt="device__img" />
      </div>
      <h5 className="main-device-item__title">{maxStrokeLength(name, 40)}</h5>
      <div className="main-device-item__bottom">
        <div className="price-wrapper">
          <p className={cn("price", { "old-price": discount })}>{price} ₴</p>
          {discount && (
            <p className="with-discount">
              {Math.floor(price - (price * discount) / 100)} ₴
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MainDeviceItem;
