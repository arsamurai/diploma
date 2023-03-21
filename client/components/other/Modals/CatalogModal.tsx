import React from 'react';
import { Catalog, Modal } from '..';

interface CatalogModalProps {
	active: boolean,
	setActive: (e?: any) => void
}

const CatalogModal: React.FC<CatalogModalProps> = ({active, setActive}) => {
	return (
		<Modal title="Каталог" activeModal={active} setActiveModal={setActive} >
			<Catalog />
		</Modal>
	)
}

export default CatalogModal;