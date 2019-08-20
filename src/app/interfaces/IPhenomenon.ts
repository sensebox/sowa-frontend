import { IIri } from './IIri';
import { IUnit } from './IUnit';
import { IDomain } from './IDomain';

export class IPhenomenon {
    iri: {
        type: string,
        value: string,
    };
    labels?: IIri[];
    description: {
        type: string;
        value: string;
        "xml:lang": string;
    };
    units?: IUnit[];
    domains?: IDomain[];

    constructor(phenomenonResponse: any) {
        console.log(phenomenonResponse);
        this.labels = phenomenonResponse.labels;
        this.description = phenomenonResponse.description;
        this.iri = phenomenonResponse.iri;
        this.units = phenomenonResponse.units;    
        this.domains = phenomenonResponse.domains;
    }
}