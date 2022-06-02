import { ISensors } from "./ISensors";
import { ILabel } from "./ILabel";
export class IDevice {
  id: number;
  slug: string
  labels: ILabel[];
  description: Object;
  markdown: Object;
  contact: String;
  website: String;
  image: String;
  sensors: ISensors[];
  validation: boolean;

  constructor(res: any) {
    this.labels = [];
    this.sensors = [];

    for (let property in res) {
      switch(property){

        case "id": {
          this.id = res[property];
          break;
        }

        case "slug": {
          this.slug = res[property];
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

        case "image": {
          this.image = res[property];
          break;
        }

        case "website": {
          this.website = res[property];
          break;
        }

        case "contact": {
          this.contact = res[property];
          break;
        }

        case "sensors": {
          res[property].forEach((element: any) => {
            this.sensors.push(new ISensors(element));
          }) 
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
