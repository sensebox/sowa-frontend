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
        this.sensor = resSensor.sensor;
        this.sensorLabel = resSensor.sensorLabel;
        this.validation = resSensor.validation;
    }
};