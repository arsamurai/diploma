import React, { useEffect } from "react";
import cn from "classnames";
import AdminType from "./AdminType";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";

interface AdminTypesProps {
  index: number;
  activePage: number;
}

const AdminTypes: React.FC<AdminTypesProps> = ({ index, activePage }) => {
  const { fetchTypes } = useActions();
  const { types } = useTypedSelector((state) => state.types);

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div
      className={cn("page-content", "admin-types", {
        active: index === activePage,
      })}
      data-index={index}
    >
      <h4 className="page-content__title">Типи</h4>
      <div className="admin-types__items">
        <div className="admin-types__items-top">
          <div>№</div>
          <div>Назва</div>
          <div>Значення</div>
          <div>Опції</div>
        </div>
        {types.map((type, index) => (
          <AdminType key={type._id} index={index + 1} type={type} />
        ))}
      </div>
    </div>
  );
};

export default AdminTypes;
