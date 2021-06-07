export type DeviceItemType = {
    name: string;
    shortName: string;
    description?: string;
    weight?: string;
    dimensions?: string;
    voltage?: string;
    // поставки
    supply?: string;
    additionalInfo?: string;
    amountInSupply?: number;
    organization: 'NTC' | 'ST';
    comments?: string;
    isModification: boolean;
    imagePath?: string;
};
