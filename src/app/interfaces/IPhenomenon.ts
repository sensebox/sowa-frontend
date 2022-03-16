import { IIri } from './IIri';
import { IUnit } from './IUnit';
import { IDomains } from './IDomains';
import { ILabel } from './ILabel';
import { ISensors } from './ISensors';

export class IPhenomenon {
  id: number;
  labels: ILabel[];
  description: Object
  markdown: Object;
  units: IUnit[];
  domains: IDomains[];
  validation: boolean;

  constructor(res: any) {
    this.labels = [];
    this.domains = [];
    this.units = [];

    console.log(res)


    for (const property in res) {
      switch(property){

        case "id": {
          this.id = res[property];
          break;
        }

        case "label": {
          this.labels.push(new ILabel(res[property].item[0]));
          this.labels.push(new ILabel(res[property].item[1]));
          break;
        }

        case "description": {
          this.description = res[property];
          break;
        }

        case "markdown": {
          this.markdown = res[property];
          break;
        }

        case "rov": {
          res[property].forEach((element: any) => {
            this.units.push(new IUnit(element));
          });
          break;
        }

        case "domains": {
          res[property].forEach((element: any) => {
            this.domains.push(new IDomains(element));
          });
          break;
        }

        case "validation": {
          this.validation = res[property];
          break;
        }

        default: {
          break;
        }
      }
    }
  }
}