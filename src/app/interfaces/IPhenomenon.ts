import { IIri } from './IIri';
import { IUnit } from './IUnit';
import { IDomains } from './IDomains';
import { ILabel } from './ILabel';

export class IPhenomenon {
    iri: {
        type: string,
        value: string,
    };
    labels?: ILabel[];
    description: {
        type: string;
        value: string;
        "xml:lang": string;
    };
    units?: IUnit[];
    domains?: IDomains[];

    constructor(res: any) {
        // console.log(phenomenonResponse);
        // this.labels = phenomenonResponse.labels;
        // this.description = phenomenonResponse.description;
        // this.iri = phenomenonResponse.iri;
        // this.units = phenomenonResponse.units;    
        // this.domains = phenomenonResponse.domains;

        this.labels = [];
        this.units = [];
        this.domains = [];
        

        res.forEach((element: any) => {
            // console.log(element);
            switch (Object.getOwnPropertyNames(element)[0]) {
  
              case "description": {
                Object.assign(this, element);
                break;
              }
  
              case "iri": {
                Object.assign(this, element);
                break;
              }
  
              case "label": {
                this.labels.push(new ILabel(element));
                break;
              }
  
              case "unit": {
                this.units.push(element);
                break;
              }
  
              case "domain": {
                this.domains.push(element);
                break;
              }
  
              default: {
                console.log("Invalid attribute", element);
                break;
              }
            }
          })
    }
}