import { IDevices } from "./IDevices";
import { ILabel } from './ILabel';
import { ISensorElement } from './ISensorElement';
import { IDevice } from './IDevice';

export class ISensor {
  // iri: {
  //   type: string,
  //   value: string
  // };
  // sensorElements: ISensorElement[];
  // devices: IDevices[];
  // markdown: string,

  id: number;
  labels: ILabel[];
  description: Object;
  price: null;
  image: string;
  manufacturer: string;
  lifePeriod: number;
  datasheet: string;
  validation: boolean;
  sensorElements: ISensorElement[];
  
  
  

  constructor(res: any) {
    this.labels = [];
    this.sensorElements = [];
    // this.sensorElements = [];
    // this.devices = [];

    console.log(res)

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

        case "price": {
          this.price = res[property];
          break;
        }

        case "image": {
          this.image = res[property];
          break;
        }

        case "manufacturer": {
          this.manufacturer = res[property];
          break;
        }

        case "lifePeriod": {
          this.lifePeriod = res[property]
          break;
        }

        case "datasheet": {
          this.datasheet = res[property];
          break;
        }

        case "validation": {
          this.validation = res[property];
          break;
        }

        case "elements": {
          res[property].forEach((element: any) => {
            this.sensorElements.push(new ISensorElement(element));
          })
          break;
        }

        default: {
          break;
        }
      }
    }

    // res.forEach((element: any) => {
    //   // console.log(element);
    //   switch (Object.getOwnPropertyNames(element)[0]) {

    //     case "description": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "iri": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "manufacturer": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "price": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "datasheet": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "lifeperiod": {
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

    //     case "validation": {
    //       Object.assign(this, element);
    //       break;
    //     }

    //     case "label": {
    //       this.labels.push(new ILabel(element));
    //       break;
    //     }

    //     case "device": {
    //       this.devices.push(new IDevices(element));
    //       break;
    //     }

    //     case "sensorElement": {
    //       this.sensorElements.push(new ISensorElement(element));
    //       break;
    //     }

    //     default: {
    //       console.log("Invalid attribute", element);
    //       break;
    //     }
    //   }
    // })
  }

}