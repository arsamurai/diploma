import React from 'react';
import { IDevice } from '../../models/IDevice';
import DeviceItem from './DeviceItem';

interface DeviceItemsProps {
	devices: IDevice[]
}

const DeviceItems: React.FC<DeviceItemsProps> = ({devices}) => {
	return (
			<div className="device-items">
				{
					devices.map(device => {
						return <DeviceItem key={device._id} device={device} />
					})
				}
			</div>
	)
}

export default DeviceItems;