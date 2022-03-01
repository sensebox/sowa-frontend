import { ILabel } from './ILabel';

export class IPhenomena {
    phenomenon: {
        type: string,
        value: string,
    };
    phenomenonLabel: ILabel;
    validation: {
        type: string,
        value: string,
    };

  
    constructor(resPhenomenon: any) {
        this.phenomenon = resPhenomenon.id;
        this.phenomenonLabel = resPhenomenon.label.item[1].text;
        this.validation = resPhenomenon.validation;
    }
};