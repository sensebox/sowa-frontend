import { IIri } from './IIri';
import { IRoV } from './IRoV';
import { IDomains } from './IDomains';
import { ILabel } from './ILabel';
import { ISensors } from './ISensors';

export class IPhenomenon {
  id: number;
  labels: ILabel[];
  description: Object
  markdown: Object;
  units: IRoV[];
  domains: IDomains[];
  validation: boolean;

  constructor(res: any) {
    this.labels = [];
    this.domains = [];
    this.units = [];

    for (const property in res) {
      switch(property){

        case "id": {
          this.id = res[property];
          break;
        }

        case "label": {
          res[property].item.forEach(item => {
            this.labels.push(new ILabel(item))
          })
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
            this.units.push(new IRoV(element));
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