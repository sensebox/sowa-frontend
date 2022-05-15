export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonLabels: string;
    phenomenonId: number;
    unit?: string
    unitId: number
    sensorId: number;
    sensorLabels: string; 


    constructor(resSensorElement: any) {
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonLabels = resSensorElement.phenomena.label.item;
        if (resSensorElement.accuracyUnit == null) {
            this.unit = null;
        } else {
            this.unit = resSensorElement.accuracyUnit.name;
        };
        if (resSensorElement.accuracyUnit == null) {
            this.unitId = null;
        } else {
            this.unitId = resSensorElement.accuracyUnit.id;
        };
        this.phenomenonId = resSensorElement.phenomena.id,
        this.sensorId = resSensorElement.sensor.id,
        this.sensorLabels = resSensorElement.sensor.label.item;
    }
};