import React from "react";
import { IDevice } from "../../models/IDevice";
import MainDeviceItem from "./MainDeviceItem";

interface MainDeviceItemProps {
  title: string,
	devices: IDevice[]
}

const MainDeviceItems: React.FC<MainDeviceItemProps> = ({ title, devices }) => {

  return (
    <div className="main-device-items">
      <h3 className="main-device-items__title">{title}</h3>
      <div className="main-device-items__body">
        {devices?.map((device) => {
          return <MainDeviceItem key={device._id} device={device} />;
        })}
      </div>
    </div>
  );
};

export default MainDeviceItems;
