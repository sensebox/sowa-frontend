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
        this.phenomenon = resPhenomenon.phenomenon;
        this.phenomenonLabel = resPhenomenon.phenomenonLabel;
        this.validation = resPhenomenon.validation;
    }
};