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
    validation: {
        type: string,
        value: string,
    };



    constructor(resDevice: any) {
        // console.log(resDevice)
        // console.log(this)
        // this.device = {
        //     type: resDevice.device.type,
        //     value: resDevice.device.value
        // }
        // this.deviceLabel = {
        //     type: resDevice.label[0].type,
        //     value: resDevice.label[0].value,
        //     "xml:lang": resDevice.label[0]["xml:lang"]
        // }
        this.device = resDevice.id;
        this.deviceLabel = resDevice.label.item[1].text;
        this.validation = resDevice.validation;

        }
    }
