export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonLabels: string;
    phenomenonId: number;
    phenomenonSlug: string;
    unit?: string
    unitId: number;
    unitSlug: string;
    sensorId: number;
    sensorSlug: string;
    sensorLabels: string; 


    constructor(resSensorElement: any) {
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonLabels = resSensorElement.phenomena.label.item;
        if (resSensorElement.accuracyUnit == null) {
            this.unit = null;
            this.unitId = null;
            this.unitSlug = null;
        } else {
            this.unit = resSensorElement.accuracyUnit.name;
            this.unitId = resSensorElement.accuracyUnit.id;
            this.unitSlug = resSensorElement.accuracyUnit.slug;
        };
        this.phenomenonId = resSensorElement.phenomena.id,
        this.phenomenonSlug = resSensorElement.phenomena.slug,
        this.sensorId = resSensorElement.sensor.id,
        this.sensorSlug = resSensorElement.sensor.slug,
        this.sensorLabels = resSensorElement.sensor.label.item;
    }
};