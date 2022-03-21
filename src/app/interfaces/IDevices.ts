export class IDevices {
    device: number;
    deviceLabel: string;
    validation: boolean


    constructor(resDevice: any) {
        this.device = resDevice.id;
        this.deviceLabel = resDevice.label.item;
        this.validation = resDevice.validation;
    }
}
