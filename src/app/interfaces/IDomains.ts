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

    constructor(res: any) {
        this.domain = res.domain;
        this.domainLabel = res.label;
    }

}