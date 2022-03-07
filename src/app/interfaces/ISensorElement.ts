export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonName: string;
    unit: string


    constructor(resSensorElement: any) {
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonName = resSensorElement.phenomena.label.item[1].text;
        this.unit = resSensorElement.accuracyUnit.name;
    }
};