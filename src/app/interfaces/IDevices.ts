export class IDevices {
    device: number;
    deviceSlug: string;
    label: string;
    validation: boolean


    constructor(resDevice: any) {
        this.device = resDevice.id;
        this.deviceSlug = resDevice.slug;
        this.label = resDevice.label.item;
        this.validation = resDevice.validation;
    }
}
