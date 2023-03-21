import React from "react";
import { IType } from "../../../models/IType";
import { Button } from "../../other";

interface AdminTypeProps {
  type: IType,
	index: number
}

const AdminType: React.FC<AdminTypeProps> = ({ type, index }) => {
  const { name, value } = type;

  return (
    <div className="admin-type">
      <span className="admin-type__num">{index}</span>
      <p className="admin-type__name">{name}</p>
      <p className="admin-type__value">{value}</p>
      <div className="admin-type__btn">
        <Button outlined onClick={() => {}}>
          Опції
        </Button>
      </div>
    </div>
  );
};

export default AdminType;
