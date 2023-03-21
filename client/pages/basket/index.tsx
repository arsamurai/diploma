import React, { useState } from "react";
import {
  BasketPerson,
  BasketInfo,
  BasketDelivery,
} from "../../components/basket";
import { SimpleLayout } from "../../layouts";

interface BasketProps {}

const Basket: React.FC<BasketProps> = () => {

  const [person, setPerson] = useState(['']);
  const [delivery, setDelivery] = useState(['']);

  return (
    <SimpleLayout>
      <div className="basket">
        <h3 className="basket__title title">Оформлення замовлення</h3>
        <div className="basket__step">
          <h5 className="basket__step-title basket__contacts-title">Ваші контактні дані:</h5>
          <BasketPerson setPerson={setPerson} />
        </div>
        <div className="basket__step">
          <h5 className="basket__step-title basket__delivery-title">Адреса доставки:</h5>
          <BasketDelivery setDelivery={setDelivery} />
        </div>
        <div className="basket__step">
          <h5 className="basket__step-title">Ваше замовлення:</h5>
          <BasketInfo person={person} delivery={delivery} confirm />
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Basket;
