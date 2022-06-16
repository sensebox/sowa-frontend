export class ISensors {
    sensor: number;
    sensorSlug: string;
    label: string;
    validation: boolean;

    
    constructor(resSensor: any) {
        this.sensor = resSensor.id;
        this.sensorSlug = resSensor.slug;
        this.label = resSensor.label.item;
        this.validation = resSensor.validation;
    }
};