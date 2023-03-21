import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import image from '../../assets/images/default.jpeg';
import cn from "classnames";
import { IBasketItem } from '../../store/reducers/basket/types';
import { useActions } from '../../hooks/useAction';

interface BasketItemProps {
	device: IBasketItem,
	userId: any
}

const BasketItem: React.FC<BasketItemProps> = ({device, userId}) => {

	const { _id, imgPath, name, price, discount } = device.device;
	const count = device.count;

	const { addDevice, minusDevice, removeDevice } = useActions();

	const minusDeviceHander = () => {
		minusDevice({userId, deviceId: _id});
	}

	const plusDeviceHanler = () => {
		addDevice({userId, deviceId: _id});
	}

	const removeDeviceHanler = () => {
		removeDevice({userId, deviceId: _id});
	}

	return (
		<div className="basket__item">
      <div className="basket__item-top">
        <div className="basket__item-img">
					{discount && <p className="discount discount--small">{discount} %</p>}
          <img
            //onClick={() => handleActiveModal()}
            src={process.env.NEXT_PUBLIC_API_URL + imgPath}
            alt="device-img"
          />
					
        </div>
        <Link href={{ pathname: `/device/${_id}` }} className="basket__item-title">
					<h3>{name}</h3>
        </Link>
				<div className="basket__item-remove" onClick={removeDeviceHanler}><span>×</span></div>
      </div>
      <div className="basket__item-bottom">
        <div className="basket__item-count">
          <button
            onClick={minusDeviceHander}
            className="basket__item-count-minus"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              />
            </svg>
          </button>
          <b className="count">{count}</b>
          <button
            onClick={plusDeviceHanler}
            className="basket__item-count-plus"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              />
            </svg>
          </button>
        </div>
				<div className="price-wrapper basket__item-price">
          <p className={cn("price", { "old-price": discount })}>{count * price} ₴</p>
          {discount && (
            <p className="with-discount">
              {count * Math.floor(price - (price * discount) / 100)} ₴
            </p>
          )}
        </div>
      </div>
    </div>
	)
}

export default BasketItem;