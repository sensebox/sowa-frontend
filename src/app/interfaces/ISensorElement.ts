export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonLabels: string;
    phenomenonId: number;
    unit?: string
    unitId: number


    constructor(resSensorElement: any) {
        
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonLabels = resSensorElement.phenomena.label.item;
        if (resSensorElement.accuracyUnit == null) {
            this.unit = null;
        } else {
            this.unit = resSensorElement.accuracyUnit.name;
        };
        this.unitId = resSensorElement.accuracyUnit.id;
        this.phenomenonId = resSensorElement.phenomena.id
    }
};