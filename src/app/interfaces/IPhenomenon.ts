import { IIri } from './IIri';
import { IUnit } from './IUnit';
import { IDomains } from './IDomains';
import { ILabel } from './ILabel';
import { ISensors } from './ISensors';

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
  markdown: {
    datatype: string,
    type: string,
    value: string
  };
  units?: IUnit[];
  domains?: IDomains[];
  sensors?: ISensors[];
  validation: {
    datatype: string,
    type: string,
    value: string
  };

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
    this.sensors = [];
    console.log(res);


    res.forEach((element: any) => {
      switch (Object.getOwnPropertyNames(element)[0]) {

        case "description": {
          Object.assign(this, element);
          break;
        }

        case "markdown": {
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

        case "rov": {
          this.units.push(element);
          break;
        }

        case "domain": {
          this.domains.push(element);
          break;
        }

        case "validation": {
          Object.assign(this, element);
          break;
        }


        case "sensors": {
          this.sensors.push(new ISensors(element));
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