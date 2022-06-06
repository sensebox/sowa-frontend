export class IUnits {
    unit: number;
    unitSlug: string;
    unitName: string;
    unitNotation: string;

    
    constructor(resUnit: any) {
        this.unit = resUnit.id;
        this.unitSlug = resUnit.slug;
        this.unitName = resUnit.name;
        this.unitNotation = resUnit.notation;
    }
};