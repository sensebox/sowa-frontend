export class IDevices {
    device: number;
    deviceLabel: string;
    validation: boolean


    constructor(resDevice: any) {
        this.device = resDevice.id;
        this.deviceLabel = resDevice.label.item[1].text;
        this.validation = resDevice.validation;
    }
}
