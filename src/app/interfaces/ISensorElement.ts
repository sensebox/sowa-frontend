export class ISensorElement {
    id: number
    accuracy: number;
    phenomenonName: string;
    unit?: string


    constructor(resSensorElement: any) {
        console.log(resSensorElement)
        this.id = resSensorElement.id;
        this.accuracy = resSensorElement.accuracy;
        this.phenomenonName = resSensorElement.phenomena.label.item[1].text;
        if (resSensorElement.accuracyUnit == null) {
            this.unit = null;
        } else {
            this.unit = resSensorElement.accuracyUnit.name;
        } 
    }
};