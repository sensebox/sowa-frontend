export class ISensors {
    sensor: number;
    sensorLabel: string;
    validation: boolean;

    
    constructor(resSensor: any) {
        this.sensor = resSensor.id;
        this.sensorLabel = resSensor.label.item;
        this.validation = resSensor.validation;
    }
};