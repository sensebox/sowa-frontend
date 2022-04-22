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
  devices: IDevices[];
  
  

  constructor(res: any) {
    this.labels = [];
    this.sensorElements = [];
    this.devices = [];

    for (let property in res) {
      switch(property){

        case "id": {
          this.id = res[property];
          break;
        }

        case "label": {
          res[property].item.forEach(element => {
            this.labels.push(new ILabel(element))
          })
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

        case "devices": {
          res[property].forEach((element: any) => {
            this.devices.push(new IDevices(element));
          })
          break;
        }

        default: {
          break;
        }
      }
    }
  }

}