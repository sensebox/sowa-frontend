export class IUnit {
    rovId?: number;
    unitId: number;
    unitLabel: string;
    unitAbbr: string;
    min?: number;
    max?: number;

    constructor(resUnit: any) {
        this.rovId = resUnit.id;
        this.unitId = resUnit.unit.id;
        this.unitLabel = resUnit.unit.name;
        this.min = resUnit.min;
        this.max = resUnit.max;
    }
}