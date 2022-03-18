export class IDomains {
    domain: number
    domainLabel: string;
    validation: boolean;


    constructor(resDomain: any) {
        this.domain = resDomain.id;
        this.domainLabel = resDomain.label.item;
        this.validation = resDomain.validation;
    }
}