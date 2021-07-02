import type { Device } from '../../store/deviceSlice';

export const mapDevicesToTableData = (deviceList: Device[]) =>
    deviceList.map((device) => {
        return {
            id: device.id,
            name: device.name,
            shortName: device.shortName,
            description: device.description,
            imagePath: device.imagePath,
            data: { ...device },
        };
    });