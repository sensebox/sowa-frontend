import { ISensors } from "./ISensors";
import { ILabel } from "./ILabel";
export class IDevice {
  iri: {
    type: string;
    value: string;
  };
  labels: ILabel[];
  description: {
    type: string;
    value: string;
    "xml:lang": string;
  };
  website: {
    datatype: string;
    type: string;
    value: string;
  };
  image: {
    datatype: string;
    type: string;
    value: string;
  };
  markdown: {
    datatype: string;
    type: string;
    value: string;
  };
  contact: {
    datatype: string;
    type: string;
    value: string;
  };
  sensors: ISensors[];
  validation: {
    datatype: string;
    type: string;
    value: string;
  };

  constructor(res: any) {
    this.labels = [];
    this.sensors = [];

    res.forEach((element: any) => {
      console.log(element);
      switch (Object.getOwnPropertyNames(element)[0]) {
        case "description": {
          Object.assign(this, element);
          break;
        }

        case "iri": {
          Object.assign(this, element);
          break;
        }

        case "website": {
          Object.assign(this, element);
          break;
        }

        case "image": {
          Object.assign(this, element);
          break;
        }

        case "markdown": {
          Object.assign(this, element);
          break;
        }

        case "contact": {
          Object.assign(this, element);
          break;
        }

        case "label": {
          this.labels.push(new ILabel(element));
          break;
        }

        case "sensor": {
          this.sensors.push(new ISensors(element));
          break;
        }

        case "validation": {
          Object.assign(this, element);
          break;
        }

        default: {
          console.log("Invalid attribute");
          break;
        }
      }
    });
  }
}
