export class IDomains {
    domain: {
        type: string,
        value: string,
    };
    domainLabel: {
        type: string,
        value: string,
        "xml:lang": string
    };
    validation: {
        type: string,
        value: string,
    };


    constructor(res: any) {
        this.domain = res.domain;
        this.domainLabel = res.label;
        this.validation = res.validation;
    }

}