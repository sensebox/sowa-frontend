export class IPhenomena {
    phenomenon: number
    phenomenonLabel: string;
    validation: boolean;

  
    constructor(resPhenomenon: any) {
        this.phenomenon = resPhenomenon.id;
        this.phenomenonLabel = resPhenomenon.label.item[1].text;
        this.validation = resPhenomenon.validation;
    }
}