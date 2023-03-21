import React from "react";
import { maxStrokeLength } from "../../../helpers";
import { IOrder } from "../../../models/IOrder";
import { Button } from "../../other";

interface OrderProps {
  order: IOrder;
  index: number;
}

const Order: React.FC<OrderProps> = ({ order, index }) => {
  const { user, devices } = order;

  return (
    <div className="order">
      <span className="order__num">{index}</span>
      <div className="order__user">
        <p className="order__name">{user.name}</p>
        <p className="order__surname">{user.surname}</p>
        <p className="order__byFather">{user.byFather}</p>
        <p className="order__phone">({user.phoneNumber})</p>
      </div>
      <div className="order__value">
        {devices.map((device) => {
          return (
            <div key={device._id} className="order__value-list">
              <div className="order__value-list__item">{device.count} шт.</div>
              <div className="order__value-list__item">
                {device.count *
                  (device.device.discount
                    ? Math.floor(
                        device.device.price -
                          (device.device.price * device.device.discount) / 100
                      )
                    : device.device.price)}{" "}
                грн
              </div>
							<div className="order__value-list__item">
                {maxStrokeLength(device.device.name, 45)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="order__btn">
        <Button outlined onClick={() => {}}>
          Опції
        </Button>
      </div>
    </div>
  );
};

export default Order;
