export class IDomains {
    domain: number
    domainSlug: string
    label: string;
    validation: boolean;


    constructor(resDomain: any) {
        this.domain = resDomain.id;
        this.domainSlug = resDomain.slug;
        this.label = resDomain.label.item;
        this.validation = resDomain.validation;
    }
}