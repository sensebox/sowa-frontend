import { ILabel } from './ILabel';

export class ISensors {
    sensor: {
        type: string,
        value: string,
    };
    sensorLabel: {
        type: string,
        value: string,
        "xml:lang": string
    };
    validation: {
        type: string,
        value: string,
    };

    constructor(resSensor: any) {
        this.sensor = resSensor.id;
        this.sensorLabel = resSensor.label.item[1].text;
        this.validation = resSensor.validation;
    }
};