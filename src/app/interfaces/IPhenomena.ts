import { ILabel } from './ILabel';

export class IPhenomena {
    phenomenon: {
        type: string,
        value: string,
    };
    phenomenonLabel: ILabel;
  
    constructor(resPhenomenon: any) {
        this.phenomenon = resPhenomenon.phenomenon;
        this.phenomenonLabel = resPhenomenon.phenomenonLabel;
    }
};