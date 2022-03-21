export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonLabels: string;
    phenomenonId: number;
    unit?: string


    constructor(resSensorElement: any) {
        // console.log(resSensorElement)
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonLabels = resSensorElement.phenomena.label.item;
        if (resSensorElement.accuracyUnit == null) {
            this.unit = null;
        } else {
            this.unit = resSensorElement.accuracyUnit.name;
        };
        this.phenomenonId = resSensorElement.phenomena.id
    }
};