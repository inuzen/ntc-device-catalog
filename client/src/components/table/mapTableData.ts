import type { Device } from '../../store/deviceSlice';

export const mapDevicesToTableData = (deviceList: Device[]) =>
    deviceList.map((device) => {
        return {
            id: device.id,
            name: device.name,
            shortName: device.shortName,
            description: device.description,
            imageCell: { imgPath: device.imagePath, isMod: !!device.isModification },
            data: { ...device },
        };
    });

export type TableDataProps = ReturnType<typeof mapDevicesToTableData>;
export type TableDataPropItem = TableDataProps[0];
