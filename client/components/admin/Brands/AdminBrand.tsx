import React from "react";
import { IBrand } from "../../../models/IBrand";
import { Button } from "../../other";

interface AdminBrandProps {
  brand: IBrand,
	index: number
}

const AdminBrand: React.FC<AdminBrandProps> = ({ brand, index }) => {
  const { name, value } = brand;

  return (
    <div className="admin-brand">
      <span className="admin-brand__num">{index}</span>
      <p className="admin-brand__name">{name}</p>
      <p className="admin-brand__value">{value}</p>
      <div className="admin-brand__btn">
        <Button outlined onClick={() => {}}>
          Опції
        </Button>
      </div>
    </div>
  );
};

export default AdminBrand;
