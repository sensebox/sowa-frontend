export class IDevices {
    device: number;
    deviceSlug: string;
    deviceLabel: string;
    validation: boolean


    constructor(resDevice: any) {
        this.device = resDevice.id;
        this.deviceSlug = resDevice.slug;
        this.deviceLabel = resDevice.label.item;
        this.validation = resDevice.validation;
    }
}
