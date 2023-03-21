import React from 'react';
import { Modal } from '..';
import { BasketInfo } from '../../basket';

interface BasketModalProps {
	active: boolean,
	setActive: (e?: any) => void
}

const BasketModal: React.FC<BasketModalProps> = ({active, setActive}) => {
	return (
		<Modal title="Кошик" activeModal={active} setActiveModal={setActive} >
			<BasketInfo />
		</Modal>
	)
}

export default BasketModal;