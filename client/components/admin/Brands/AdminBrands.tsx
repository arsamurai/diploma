import React, { useEffect } from "react";
import cn from "classnames";
import AdminBrand from "./AdminBrand";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";

interface AdminBrandsProps {
  index: number;
  activePage: number;
}

const AdminBrands: React.FC<AdminBrandsProps> = ({ index, activePage }) => {
  const { fetchBrands } = useActions();
  const { brands } = useTypedSelector((state) => state.brands);

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div
      className={cn("page-content", "admin-brands", {
        active: index === activePage,
      })}
      data-index={index}
    >
      <h4 className="page-content__title">Бренди</h4>
      <div className="admin-brands__items">
        <div className="admin-brands__items-top">
          <div>№</div>
          <div>Назва</div>
          <div>Значення</div>
          <div>Опції</div>
        </div>
        {brands.map((brand, index) => (
          <AdminBrand key={brand._id} index={index + 1} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default AdminBrands;
