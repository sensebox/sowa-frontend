export class IPhenomena {
    phenomenon: number;
    phenomenonSlug: string;
    label: string;
    validation: boolean;

  
    constructor(resPhenomenon: any) {
        this.phenomenon = resPhenomenon.id;
        this.phenomenonSlug = resPhenomenon.slug;
        this.label = resPhenomenon.label.item;
        this.validation = resPhenomenon.validation;
    }
}