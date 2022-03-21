export class IUnit {
    id: number;
    unitLabel: string;
    unitAbbr: string;
    min?: number;
    max?: number;

    constructor(resUnit: any) {
        this.id = resUnit.unit.id;
        this.unitLabel = resUnit.unit.name;
        this.min = resUnit.min;
        this.max = resUnit.max;
    }
}