import React, { useEffect, useState } from "react";
import DeviceItems from "../components/device/DeviceItems";
import Image from "next/image";
import { BrandList, SortList } from "../components/device";
import { Button, CatalogModal, Pagination } from "../components/other";
import catalogIcon from "../assets/images/icons/catalog.png";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IBrand } from "../models/IBrand";
import { ISort } from "../store/reducers/filters/types";

interface DevicesPageLayoutProps {
  title: string;
  type: string;
}

const DevicesPageLayout: React.FC<DevicesPageLayoutProps> = ({
  title,
	type
}) => {

	const [activeCatalog, setActiveCatalog] = useState(false);
	const [pagesCount, setPagesCount] = useState(1);
	const history = useRouter();
	const { devices, count } = useTypedSelector(state => state.devices);
	const { byBrand, sortBy, offset } = useTypedSelector(state => state.filters);
	const { fetchDevices, setByBrand, setSortBy } = useActions();
	
	const backHandler = () => {
    history.back()
  };

	const catalogHandler = () => {
    setActiveCatalog(true);
  };

	const onChangeBrand = (brand: IBrand) => {
		setByBrand(brand);
	}

	const onChangeSort = (sort: ISort) => {
		setSortBy(sort);
	}

	console.log(devices, count, pagesCount)

	useEffect(() => {
		fetchDevices(type, byBrand.value, sortBy, offset);
		count && setPagesCount(Math.ceil(count / 12))
	}, [byBrand, sortBy, offset, count])
	
  return (
    <div className="devices-page">
      <div className="devices-page__buttons">
        <Button simplified onClick={backHandler}>Назад</Button>
        <Button outlined className="devices-page__catalog-btn" onClick={catalogHandler}>
          <Image src={catalogIcon} alt="catalog" className="catalog-icon" />
          <span>Каталог</span>
        </Button>
      </div>
      <h3 className="devices-page__title title">{title}</h3>
      <div className="devices-page__filters">
        <SortList activeItem={sortBy.value} onSelectSortBy={onChangeSort} />
        <BrandList activeItem={byBrand.value} onSelectBrand={onChangeBrand} />
      </div>
      <div className="devices-page__body">
        <DeviceItems devices={devices} />
				{pagesCount > 1 && <Pagination offset={offset} pagesCount={pagesCount} /> }
      </div>
			<CatalogModal active={activeCatalog} setActive={setActiveCatalog} />
    </div>
  );
};

export default DevicesPageLayout;