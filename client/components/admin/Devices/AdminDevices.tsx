import React, { useEffect, useState } from "react";
import cn from "classnames";
import AdminDevice from "./AdminDevice";
import { devicesApi } from "../../../API/devices";
import { useActions } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface AdminDevicesProps {
  index: number;
  activePage: number;
}

const AdminDevices: React.FC<AdminDevicesProps> = ({ index, activePage }) => {
  const { fetchAllDevices } = useActions();
  const { allDevices } = useTypedSelector((state) => state.devices);

  useEffect(() => {
    fetchAllDevices();
  }, []);

  return (
    <div
      className={cn("page-content", "admin-devices", {
        active: index === activePage,
      })}
      data-index={index}
    >
      <h4 className="page-content__title">Товари</h4>
      <div className="admin-devices__items">
        <div className="admin-devices__items-top">
          <div>№</div>
          <div>Фото</div>
          <div>Назва</div>
          <div>Рейтинг</div>
          <div>Ціна</div>
          <div>Скидка</div>
          <div>Опції</div>
        </div>
        {allDevices.map((device, index) => (
          <AdminDevice key={device._id} index={index + 1} device={device} />
        ))}
      </div>
    </div>
  );
};

export default AdminDevices;
