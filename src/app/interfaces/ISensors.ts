export class ISensors {
    sensor: number;
    sensorSlug: string;
    sensorLabel: string;
    validation: boolean;

    
    constructor(resSensor: any) {
        this.sensor = resSensor.id;
        this.sensorSlug = resSensor.slug;
        this.sensorLabel = resSensor.label.item;
        this.validation = resSensor.validation;
    }
};