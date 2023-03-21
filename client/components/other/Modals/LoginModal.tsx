import React from 'react';
import LoginForm from '../../auth/LoginForm';
import Modal from './Modal';

interface LoginModalProps {
	active: boolean,
	setActive: (e?: any) => void
}

const LoginModal: React.FC<LoginModalProps> = ({active, setActive}) => {
	return (
		<Modal title="Вхід" activeModal={active} setActiveModal={setActive} className="login-modal" >
			<LoginForm setActiveModal={setActive} />
		</Modal>
	)
}

export default LoginModal;