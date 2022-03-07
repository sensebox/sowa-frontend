import { ISensors } from "./ISensors";
import { ILabel } from "./ILabel";
export class IDevice {
  id: number;
  labels: ILabel[];
  description: Object;
  markdown: Object;
  image: String;
  sensors: ISensors[];
  validation: boolean;

  // iri: {
  //   type: string;
  //   value: string;
  // };
  
  // website: {
  //   datatype: string;
  //   type: string;
  //   value: string;
  // };
  // image: {
  //   datatype: string;
  //   type: string;
  //   value: string;
  // };
  // contact: {
  //   datatype: string;
  //   type: string;
  //   value: string;
  // };

  constructor(res: any) {
    this.labels = [];
    this.sensors = [];

    for (let property in res) {
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

        case "image": {
          this.image = res[property];
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


    // res.forEach((element: any) => {
    //   console.log(element);
    //   switch (Object.getOwnPropertyNames(element)[0]) {
    //     case "description": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "iri": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "website": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "image": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "markdown": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "contact": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "label": {
    //       this.labels.push(new ILabel(element));
    //       break;
    //     }

    //     case "sensor": {
    //       this.sensors.push(new ISensors(element));
    //       break;
    //     }

    //     case "validation": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     default: {
    //       console.log("Invalid attribute");
    //       break;
    //     }
    //   }
    // });
  }
}
