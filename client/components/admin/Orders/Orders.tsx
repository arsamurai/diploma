import React, { useEffect } from "react";
import cn from "classnames";
import Order from "./Order";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";

interface OrdersProps {
  index: number;
  activePage: number;
}

const Orders: React.FC<OrdersProps> = ({ index, activePage }) => {
  const { fetchOrders } = useActions();
  const { orders } = useTypedSelector((state) => state.orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className={cn("page-content", "orders", { active: index === activePage })}
      data-index={index}
    >
      <h4 className="page-content__title">Замовлення</h4>
      <div className="orders__items">
        <div className="orders__items-top">
          <div>№</div>
          <div>Замовник</div>
          <div className="spec">Замовлення</div>
          <div className="spec">Опції</div>
        </div>
        {orders.map((order, index) => (
          <Order key={order._id} index={index + 1} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
