import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import cn from "classnames";
import { MainLayout } from "../../layouts";
import { Recommendations } from "../../components/device";
import { AddDeviceModal, Button, CatalogModal, DeviceSlider } from "../../components/other";
import { Comments } from "../../components/device";
import star from "../../assets/images/icons/star.svg";
import starHalf from "../../assets/images/icons/star-half.svg";
import starLine from "../../assets/images/icons/star-line.svg";
import catalogIcon from "../../assets/images/icons/catalog.png";
import { useRouter } from "next/router";
import { wrapper } from "../../store";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { DeviceActionCreators } from "../../store/reducers/device/action-creator";
import { maxStrokeLength } from "../../helpers";

const Device: React.FC = () => {
  const [activeCatalog, setActiveCatalog] = useState(false);
  const [activeAddDevice, setActiveAddDevice] = useState(false);
  const [priceFixed, setPriceFixed] = useState(false);
  const [countOfDevice, setCountOfDevice] = useState<number | undefined>();
  const history = useRouter();
  const devicePrice = useRef<HTMLDivElement>(null);
  const { addDevice } = useActions();
  const basket = useTypedSelector((state) => state.basket.basket);

	const { device, recsTypes, recsBrands, isLoading } = useTypedSelector(state => state.device);

  const calcCount = () => {
    setCountOfDevice(
      basket?.devices?.find((item) => item.device._id === device._id)?.count
    );
  };

  const priceFixedIsActive = (e: any) => {
    if (devicePrice.current) {
      const windowHeight = window.screen.height;
      const documentScrollTop = e.target.documentElement.scrollTop;
      const devicePriceOffsetTop = devicePrice.current.offsetTop;

      if (
        devicePriceOffsetTop >= documentScrollTop + windowHeight ||
        devicePriceOffsetTop <= documentScrollTop
      ) {
        setPriceFixed(true);
      } else {
        setPriceFixed(false);
      }
    }
  };

  const backHandler = () => {
    history.back();
  };

  const catalogHandler = () => {
    setActiveCatalog(true);
  };

  const addDeviceHandler = () => {
		addDevice({ userId: basket.user, deviceId: device?._id });
    setActiveAddDevice(true);
  };


  useEffect(() => {
    calcCount();
    document.addEventListener("scroll", priceFixedIsActive);
    return () => {
      document.removeEventListener("scroll", priceFixedIsActive);
    };
  }, [basket]);

	if(isLoading) {
		<MainLayout device>
      <div className="loading">Loading...</div>
    </MainLayout>
	}

  return (
    <MainLayout device>
      {Object.keys(device).length !== 0 && <div className="device">
        <div className="device__buttons">
          <Button simplified onClick={backHandler}>
            Назад
          </Button>
          <Button
            outlined
            className="device__catalog-btn"
            onClick={catalogHandler}
          >
            <Image src={catalogIcon} alt="catalog" className="catalog-icon" />
            <span>Каталог</span>
          </Button>
        </div>
        <h4 className="device__title title">{maxStrokeLength(device.name, 80)}</h4>
        <ul className="device__rating">
          <div className="rating">
            <ReactStars
              className="react-rating"
              value={device.rating}
              size={15}
              isHalf={true}
							edit={false}
              filledIcon={
                <Image className="rating-star" src={star} alt="star" />
              }
              halfIcon={
                <Image className="rating-star" src={starHalf} alt="star" />
              }
              emptyIcon={
                <Image className="rating-star" src={starLine} alt="star" />
              }
            />
          </div>
        </ul>
        <div className="device__main">
          <div className="device__slider">
            <DeviceSlider images={device.imgPath} />
          </div>
          <div className="device__info">
            <div className="device__desc">
              <div className="device__desc-item">
                <p className="device__desc-prop">Тип:</p>
                <div className="device__desc-value">{device.typeId.name}</div>
              </div>
              <div className="device__desc-item">
                <p className="device__desc-prop">Бренд:</p>
                <div className="device__desc-value">{device.brandId.name}</div>
              </div>
              {device.info.screenDiagonal && (
                <div className="device__desc-item">
                  <p className="device__desc-prop">Діагональ екрана:</p>
                  <p className="device__desc-value">
                    {device.info.screenDiagonal}
                  </p>
                </div>
              )}
              {device.info.screenRefreshRate && (
                <div className="device__desc-item">
                  <p className="device__desc-prop">Частота оновлення:</p>
                  <p className="device__desc-value">
                    {device.info.screenRefreshRate}
                  </p>
                </div>
              )}
              {device.info.batteryCapacity && (
                <div className="device__desc-item">
                  <p className="device__desc-prop">Ємність батареї:</p>
                  <p className="device__desc-value">
                    {device.info.batteryCapacity}
                  </p>
                </div>
              )}
              {device.info.сonnection && (
                <div className="device__desc-item">
                  <p className="device__desc-prop">З'єднання:</p>
                  <p className="device__desc-value">{device.info.сonnection}</p>
                </div>
              )}
              <div className="device__desc-item">
                <p className="device__desc-prop">Колір:</p>
                <div className="device__desc-value">{device.info.color}</div>
              </div>
              <div className="device__desc-item">
                <p className="device__desc-prop">Розміри:</p>
                <div className="device__desc-value">{device.info.size}</div>
              </div>
              <div className="device__desc-item">
                <p className="device__desc-prop">Вага:</p>
                <div className="device__desc-value">{device.info.weight}</div>
              </div>
              <div className="device__desc-item">
                <p className="device__desc-prop">Особливості:</p>
                <div className="device__desc-value">
                  {device.info.otherDescr}
                </div>
              </div>
              <div className="device__desc-item">
                <p className="device__desc-prop">Країна-виробник:</p>
                <p className="device__desc-value">
                  {device.info.countryProductManufacturer}
                </p>
              </div>
            </div>
            <div className="device__bottom" ref={devicePrice}>
              <div className="device__price">
                <div className="price-wrapper">
                  <p className={cn("price", { "old-price": device.discount })}>
                    {device.price} ₴
                  </p>
                  {device.discount && (
                    <p className="with-discount">
                      {Math.floor(
                        device.price - (device.price * device.discount) / 100
                      )}{" "}
                      ₴
                    </p>
                  )}
                </div>
              </div>
              <Button className="device__buy-btn" onClick={addDeviceHandler}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
                </svg>
                <span>Купити</span>
                {countOfDevice && (
                  <div className="device__buy-count">({countOfDevice})</div>
                )}
              </Button>
            </div>
          </div>
        </div>
        <Comments
          comments={device.comments}
          device={device}
        />
      </div>}
      <Recommendations title="Можливо ви шукаєте" devices={recsTypes} />
      <Recommendations title="Часто купують" devices={recsBrands} />
      <CatalogModal active={activeCatalog} setActive={setActiveCatalog} />
      <AddDeviceModal active={activeAddDevice} setActive={setActiveAddDevice} />
      <div className={cn("device-carriage", { active: priceFixed })}>
        <div className="container">
          <div className="device-carriage__inner">
            <h4 className="device-carriage__title title">{maxStrokeLength(device.name, 35)}</h4>
            <div className="device-carriage__price">
              <p className={cn("price", { "price-none": device.discount })}>
                {device.price} ₴
              </p>
              {device.discount && (
                <p
                  className={cn("price", { "with-discount": device.discount })}
                >
                  {Math.floor(
                    device.price - (device.price * device.discount) / 100
                  )}{" "}
                  ₴
                </p>
              )}
              <Button className="button--add" onClick={() => {}}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Купити</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Device;

export const getServerSideProps = wrapper.getServerSideProps(
  (state) =>
    async ({ params }) => {
			const dispatch = state.dispatch;
      await dispatch(DeviceActionCreators.fetchDevice(params?.id));
      return {
        props: {},
      };
    }
);
