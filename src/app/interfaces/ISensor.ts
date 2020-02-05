import { IDevices } from "./IDevices";
import { ILabel } from './ILabel';
import { ISensorElement } from './ISensorElement';
import { IDevice } from './IDevice';

export class ISensor {
    iri: {
        type: string,
        value: string
    };
    labels: ILabel[];
    description: {
        type: string;
        value: string;
        "xml:lang": string;
    };
    sensorElements: ISensorElement[];
    devices: IDevices[];
    manufacturer: {
        datatype: string,
        type: string,
        value: string
    };
    price: {
        datatype: string,
        type: string,
        value: string
    };
    datasheet: {
        datatype: string,
        type: string,
        value: string
    };
    lifeperiod: {
        datatype: string,
        type: string,
        value: string
    };
    image: {
        datatype: string,
        type: string,
        value: string
    };
    constructor(res: any) {
        // console.log(sensorResponse);
        // this.labels = sensorResponse.labels;
        // this.description = sensorResponse.description;
        // this.iri = sensorResponse.iri;
        // this.sensorElements = sensorResponse.sensorElements;    
        // this.devices = sensorResponse.devices;
        // this.sensorElements = sensorResponse.sensorElements;    
        // this.manufacturer = sensorResponse.manufacturer;    
        // this.price = sensorResponse.price;    
        // this.datasheet = sensorResponse.datasheet;    
        // this.lifeperiod = sensorResponse.lifeperiod;    
        // this.image = sensorResponse.image;
        this.labels = [];
        this.sensorElements = [];
        this.devices = []; 

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
      
              case "manufacturer": {
                Object.assign(this, element);
                break;
              }
      
              case "price": {
                Object.assign(this, element);
                break;
              }
      
              case "datasheet": {
                Object.assign(this, element);
                break;
              }
      
              case "lifeperiod": {
                Object.assign(this, element);
                break;
              }
              
              case "image": {
                Object.assign(this, element);
                break;
              }
      
              case "label": {
                this.labels.push(new ILabel(element));
                break;
              }
      
              case "device": {
                this.devices.push(new IDevices (element));
                break;
              }
      
              case "sensorElement": {
                this.sensorElements.push(new ISensorElement(element));
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