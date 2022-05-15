export class IRoV {
    rovId?: number;
    unitId: number;
    unitLabel: string;
    unitAbbr: string;
    min?: number;
    max?: number;

    constructor(resRoV: any) {
        this.rovId = resRoV.id;
        this.unitId = resRoV.unit.id;
        this.unitLabel = resRoV.unit.name;
        this.min = resRoV.min;
        this.max = resRoV.max;
    }
}