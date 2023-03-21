//import Head from 'next/head'
import Image from "next/image";
import { MainCatalog, MainDeviceItems } from "../components/main";
import { Button, CatalogModal, MainSlider } from "../components/other";
import { MainLayout } from "../layouts";
import catalogIcon from "../assets/images/icons/catalog.png";
import { useState } from "react";
import { wrapper } from "../store";
import { devicesApi } from "../API/devices";
import { IDevice } from "../models/IDevice";

interface MainProps {
  serverWithType: IDevice[];
  serverWithBrand: IDevice[];
  serverWithHighRite: IDevice[];
  serverWithDisocunt: IDevice[];
}

const Main: React.FC<MainProps> = ({
serverWithType,
serverWithBrand,
serverWithHighRite,
serverWithDisocunt,
}) => {
  const [activeCatalog, setActiveCatalog] = useState(false);
  const [withType, setWithType] = useState<IDevice[]>(serverWithType);
  const [withBrand, setWithBrand] = useState<IDevice[]>(serverWithBrand);
  const [withHighRite, setWithHighRite] = useState<IDevice[]>(serverWithHighRite);
  const [withDisocunt, setWithDisocunt] =
    useState<IDevice[]>(serverWithDisocunt);

  const catalogHandler = () => {
    setActiveCatalog(true);
  };

  return (
    <>
      <MainLayout>
        <div className="main">
          <div className="main-catalog__wrapper main-catalog--desktop">
            <MainCatalog />
          </div>
          <div className="main__body">
            <div className="main__slider">
              <MainSlider />
            </div>
            <div className="main-catalog__wrapper main-catalog--mobile">
              <MainCatalog />
            </div>
            <Button className="main-catalog__btn" onClick={catalogHandler}>
              <Image src={catalogIcon} alt="catalog" className="catalog-icon" />
              <span>Каталог товарів</span>
            </Button>
            <div className="main__body-goods">
              <MainDeviceItems title={"Бестселери в категорії Телевізори"} devices={withType} />
              <MainDeviceItems title={"З високим рейтингом"} devices={withHighRite}  />
              <MainDeviceItems title={"Найкращі серед IPhone"} devices={withBrand}  />
              <MainDeviceItems title={"Акційні товари"} devices={withDisocunt}  />
            </div>
          </div>
          <CatalogModal active={activeCatalog} setActive={setActiveCatalog} />
        </div>
      </MainLayout>
    </>
  );
};

export default Main;

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  const withType = await devicesApi.getDevicesByType("tv", 7);
  const withBrand = await devicesApi.getDevicesByBrand("IPhone", 7);
  const withHighRite = await devicesApi.getPopular(7);
  const withDisocunt = await devicesApi.getDevicesByDiscount(7);
  return {
    props: {
      serverWithType: withType,
      serverWithBrand: withBrand,
      serverWithHighRite: withHighRite,
      serverWithDisocunt: withDisocunt,
    },
  };
});