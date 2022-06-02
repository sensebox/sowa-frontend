export class IDomains {
    domain: number
    domainSlug: string
    domainLabel: string;
    validation: boolean;


    constructor(resDomain: any) {
        this.domain = resDomain.id;
        this.domainSlug = resDomain.slug;
        this.domainLabel = resDomain.label.item;
        this.validation = resDomain.validation;
    }
}