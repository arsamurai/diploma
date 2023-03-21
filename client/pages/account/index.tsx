import React, { useRef, useState } from 'react';
import nextCookie from 'next-cookies';
import Image from 'next/image';
import cn from 'classnames';
import { MainLayout } from '../../layouts';
import { Button, Input, PhoneInput } from '../../components/other';
import { useFormik } from 'formik';
import { accountSchema } from '../../validation/validate';
import image from '../../assets/images/default.jpeg';
import personal from '../../assets/images/icons/personal.png';
import contacts from '../../assets/images/icons/contacts.png';
import list from '../../assets/images/icons/list.png';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { wrapper } from '../../store';
import { useRouter } from 'next/router';

const Account: React.FC = () => {
	const history = useRouter();

	const [editFirst, setEditFirst] = useState(false);
	const [editSecond, setEditSecond] = useState(false);

	const { user, isLoading } = useTypedSelector((state) => state.user);
	const { updateUser, logout } = useActions();

	const logoutHandler = () => {
		history.push('/');
		logout();
	};

	const editFirstBlock = () => {
		setEditFirst(true);
	};

	const editSecondBlock = () => {
		setEditSecond(true);
	};

	const saveFirstBlock = () => {
		setEditFirst(false);
		updateUser({ id: user._id, ...formik.values });
	};

	const saveSecondBlock = () => {
		setEditSecond(false);
		updateUser({ id: user._id, ...formik.values });
	};

	const cancelFirstBlock = () => {
		setEditFirst(false);
	};

	const cancelSecondBlock = () => {
		setEditSecond(false);
	};

	const form1Ref: any = useRef();
	const form2Ref: any = useRef();
	const formik = useFormik({
		initialValues: {
			surname: user.surname,
			name: user.name,
			byFather: user.byFather,
			phoneNumber: user.phoneNumber,
			email: user.email,
		},
		validationSchema: accountSchema,
		onSubmit: async (values) => {},
	});

	if (isLoading) {
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="account">
				<div className="account__preview">
					<Image src={image} alt="avatar" className="account__preview-img" />
					<h5 className="account__preview-login">@{user.login}</h5>
					<div className="account__settings-btns">
						<button className="edit-btn">Редагувати</button>
						<button className="save-btn">Зберегти</button>
						<button className="cancel-btn">Відміна</button>
					</div>
				</div>
				<div className={cn('account__block', { edit: editFirst })}>
					<div className="account__block-header">
						<Image
							src={personal}
							alt="personal-date"
							className="block-header__img"
						/>
						<h5 className="block-header__title">Особисті дані:</h5>
					</div>
					<form ref={form1Ref} className="account__block-form">
						<ul className="account__block-items">
							<li className="account__block-item">
								<label className="account__block-item__label">Прізвище</label>
								<p className="account__block-item__text">{user.surname}</p>
								<Input
									name="surname"
									message={formik.errors.surname}
									onChange={formik.handleChange}
									touched={formik.touched.surname}
									onBlur={formik.handleBlur}
									value={formik.values.surname}
									className="account__block-item__input"
								/>
							</li>
							<li className="account__block-item">
								<label className="account__block-item__label">Ім'я</label>
								<p className="account__block-item__text">{user.name}</p>
								<Input
									name="name"
									message={formik.errors.name}
									onChange={formik.handleChange}
									touched={formik.touched.name}
									onBlur={formik.handleBlur}
									value={formik.values.name}
									className="account__block-item__input"
								/>
							</li>
							<li className="account__block-item">
								<label className="account__block-item__label">
									По батькові
								</label>
								<p className="account__block-item__text">{user.byFather}</p>
								<Input
									name="byFather"
									message={formik.errors.byFather}
									onChange={formik.handleChange}
									touched={formik.touched.byFather}
									onBlur={formik.handleBlur}
									value={formik.values.byFather}
									className="account__block-item__input"
								/>
							</li>
						</ul>
					</form>
					<div className="account__settings-btns">
						<Button
							className={cn({ active: !editFirst })}
							onClick={editFirstBlock}
						>
							Редагувати
						</Button>
						<Button
							className={cn('save', { active: editFirst })}
							onClick={saveFirstBlock}
							type="submit"
						>
							Зберегти
						</Button>
						<Button
							className={cn({ active: editFirst })}
							simplified
							onClick={cancelFirstBlock}
						>
							Відміна
						</Button>
					</div>
				</div>
				<div className={cn('account__block', { edit: editSecond })}>
					<div className="account__block-header">
						<Image
							src={contacts}
							alt="contacts"
							className="block-header__img"
						/>
						<h5 className="block-header__title">Контакти:</h5>
					</div>
					<form ref={form2Ref} className="account__block-form">
						<ul className="account__block-items">
							<li className="account__block-item">
								<label className="account__block-item__label">
									Номер телефону:
								</label>
								<p className="account__block-item__text">{user.phoneNumber}</p>
								<PhoneInput
									name="phoneNumber"
									message={formik.errors.phoneNumber}
									onChange={formik.handleChange}
									touched={formik.touched.phoneNumber}
									onBlur={formik.handleBlur}
									value={formik.values.phoneNumber}
									className="account__block-item__input"
								/>
							</li>
							<li className="account__block-item">
								<label className="account__block-item__label">Пошта:</label>
								<p className="account__block-item__text">{user.email}</p>
								<Input
									type="email"
									name="email"
									message={formik.errors.email}
									onChange={formik.handleChange}
									touched={formik.touched.email}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									className="account__block-item__input"
								/>
							</li>
						</ul>
					</form>
					<div className="account__settings-btns">
						<Button
							className={cn({ active: !editSecond })}
							onClick={editSecondBlock}
						>
							Редагувати
						</Button>
						<Button
							className={cn('save', { active: editSecond })}
							onClick={saveSecondBlock}
							type="submit"
						>
							Зберегти
						</Button>
						<Button
							className={cn({ active: editSecond })}
							simplified
							onClick={cancelSecondBlock}
						>
							Відміна
						</Button>
					</div>
				</div>
				<div className="account__history">
					<div className="account__history-header">
						<Image src={list} alt="history" className="history-header__img" />
						<h5 className="history-header__title">Історія замовлень:</h5>
					</div>
					<ul className="account__history-body">
						{user?.history?.length > 0 ? (
							user.history.map((device) => {
								return (
									<li key={device.device._id} className="history-body__item">
										{device.count} : {device.device.name} :{' '}
										{device.device.price}
									</li>
								);
							})
						) : (
							<div className="history-empty">Поки що пусто</div>
						)}
					</ul>
				</div>
				<div className="account__btns">
					<Button
						onClick={logoutHandler}
						simplified
						className="account__btns-logout"
					>
						Вийти
					</Button>
					<Button
						onClick={() => {}}
						simplified
						className="account__btns-delete"
					>
						Видалити аккаунт
					</Button>
				</div>
			</div>
		</MainLayout>
	);
};

export default Account;
