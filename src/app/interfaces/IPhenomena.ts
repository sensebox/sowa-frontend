export class IPhenomena {
    phenomenon: number;
    phenomenonSlug: string;
    phenomenonLabel: string;
    validation: boolean;

  
    constructor(resPhenomenon: any) {
        this.phenomenon = resPhenomenon.id;
        this.phenomenonSlug = resPhenomenon.slug;
        this.phenomenonLabel = resPhenomenon.label.item;
        this.validation = resPhenomenon.validation;
    }
}