export class IUnits {
    unit: number;
    unitSlug: string;
    unitName: string;

    
    constructor(resUnit: any) {
        this.unit = resUnit.id;
        this.unitSlug = resUnit.slug;
        this.unitName = resUnit.name;
    }
};