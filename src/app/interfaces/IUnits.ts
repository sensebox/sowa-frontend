export class IUnits {
    unit: number;
    unitSlug: string;
    label: string;
    unitNotation: string;

    
    constructor(resUnit: any) {
        this.unit = resUnit.id;
        this.unitSlug = resUnit.slug;
        this.label = resUnit.name;
        this.unitNotation = resUnit.notation;
    }
};