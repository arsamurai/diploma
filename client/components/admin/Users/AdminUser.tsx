import Image from "next/image";
import React from "react";
import image from "../../../assets/images/default.jpeg";
import { IUser } from "../../../models/IUser";
import { Button } from "../../other";

interface AdminUserProps {
  user: IUser,
	index: number
}

const AdminUser: React.FC<AdminUserProps> = ({ user, index }) => {
  const { login, name, surname, byFather, email, phoneNumber, imgPath } = user;
  return (
    <div className="admin-user">
      <span className="admin-user__num">{index}</span>
			<Image src={image} alt="admin-device-img" className="admin-device__img" />
      <h5 className="admin-user__login">{login}</h5>
      <p className="admin-user__name">{name}</p>
      <p className="admin-user__surname">{surname}</p>
      <p className="admin-user__byFather">{byFather}</p>
      <p className="admin-user__email">{email}</p>
      <p className="admin-user__phone">{phoneNumber}</p>
      <div className="admin-user__btn">
        <Button outlined onClick={() => {}}>
          Опції
        </Button>
      </div>
    </div>
  );
};

export default AdminUser;
