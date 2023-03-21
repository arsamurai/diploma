import Link from "next/link";
import React, { useEffect } from "react";
import cn from "classnames";
import BasketItem from "./BasketItem";
import { Button } from "../other";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import basketEmpty from "../../assets/images/basket-empty.png";
import Image from "next/image";
import { useActions } from "../../hooks/useAction";

interface BasketItemsProps {
	person?: string[],
	delivery?: string[],
  confirm?: boolean,
}

const BasketItems: React.FC<BasketItemsProps> = ({person, delivery, confirm = false }) => {

	const history = useRouter();
	const { makeOrder } = useActions();

	const { basket } = useTypedSelector(state => state.basket);

	const sum = () => {
		return basket?.devices?.reduce((currentValue, device) => currentValue + device.count * (device.device.discount ? Math.floor(device.device.price - (device.device.price * device.device.discount) / 100) : device.device.price), 0);
	}

	console.log(person, delivery)

	const postOrder = () => {
		history.push("/");
		makeOrder(basket.user);
	}

	const buttonHandler = () => {
		confirm ? postOrder() : history.push("/basket");
	}

	useEffect(() => {
		sum()
	}, [basket])

  return (
    <div className={cn("basket-info", { confirm })}>
      <div className="basket__items">
        {basket?.devices?.length > 0 ? basket.devices.map((device) => {
          return <BasketItem key={device.device._id} device={device} userId={basket.user} />;
        }) : <div className='basket-empty'>
					<Image className='basket-empty__img' src={basketEmpty} alt="basket-empty" />
					<p className='basket-empty__text'>Поки жодного товару...</p>
				</div>}
      </div>
      {basket?.devices?.length > 0 && <div className="basket__sum">
        <div className="basket__sum-info">
          <h4 className="basket__sum-info__title">Разом</h4>
          <p className="basket__sum-info__price">{sum()} ₴</p>
        </div>
        <Button className="basket__sum-btn" onClick={buttonHandler}>
          {confirm ? "Замовлення підтверджую" : "Оформити замовлення"}
        </Button>
      </div>}
    </div>
  );
};

export default BasketItems;
