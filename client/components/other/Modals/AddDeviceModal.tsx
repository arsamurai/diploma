import { useRouter } from 'next/router';
import React from 'react';
import { Button, Modal } from '..';;

interface AddDeviceModalProps {
	active: boolean,
	setActive: (e?: any) => void
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({active, setActive}) => {

	const history = useRouter();

	const closeModal = () => {
		setActive(false);
	}	

	const orderHandler = () => {
    history.push("/basket");
  };

	return (
		<Modal title="Покупки" activeModal={active} setActiveModal={setActive} >
			<div className="add-device-modal">
				<Button onClick={orderHandler}>Оформити замовлення</Button>
				<Button onClick={closeModal} outlined>Продовжити покупки</Button>
			</div>
		</Modal>
	)
}

export default AddDeviceModal;