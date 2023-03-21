import React, { useEffect } from "react";
import cn from "classnames";
import AdminUser from "./AdminUser";
import { useActions } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface AdminUsersProps {
  index: number;
  activePage: number;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ index, activePage }) => {
  const { fetchUsers } = useActions();
  const { users } = useTypedSelector(state => state.users)

	useEffect(() => {
		fetchUsers();
	}, [])

  return (
    <div
      className={cn("page-content", "admin-users", { active: index === activePage })}
      data-index={index}
    >
      <h4 className="page-content__title">Товари</h4>
      <div className="admin-users__items">
			<div className="admin-users__items-top">
          <div>№</div>
          <div>Фото</div>
          <div>Логін</div>
          <div>Ім'я</div>
          <div>Фамілія</div>
          <div>По батькові</div>
          <div>Почта</div>
          <div>Телефон</div>
          <div>Опції</div>
        </div>
        {users.map((user, index) => (
          <AdminUser key={user._id} index={index + 1} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
