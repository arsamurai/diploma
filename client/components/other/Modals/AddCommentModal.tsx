import React from 'react';
import Modal from './Modal';
import { CommentsForm } from '../../device';
import { IDevice } from '../../../models/IDevice';

interface AddCommentModalProps {
	active: boolean,
	setActive: (e?: any) => void
	device: IDevice,
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({active, setActive, device}) => {

	const closeModal = () => {
		setActive(false);
	}

	return (
		<Modal title='Додати відгук' activeModal={active} setActiveModal={setActive}>
			<CommentsForm device={device} closeModal={closeModal} />
		</Modal>
	)
}

export default AddCommentModal;