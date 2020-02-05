export class IDevices {
    device: {
        type: string,
        value: string,
    };
    deviceLabel: {
        type: string,
        value: string,
        "xml:lang": string
    };

    constructor(resDevice: any) {
        console.log(resDevice)
        console.log(this)
        this.device = {
            type: resDevice.device.type,
            value: resDevice.device.value
        }
        this.deviceLabel = {
            type: resDevice.deviceLabel.type,
            value: resDevice.deviceLabel.value,
            "xml:lang": resDevice.deviceLabel["xml:lang"]
        }
    }
}
