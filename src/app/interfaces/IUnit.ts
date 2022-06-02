import { ISensorElement } from "./ISensorElement";
import { IRoV } from "./IRoV";

export class IUnit {
    id: number;
    slug: string;
    name: string;
    description: Object;
    sensorElements: ISensorElement[];
    rovs: IRoV[];

    constructor(res: any) {

        console.log(res)

        this.sensorElements = [];
        this.rovs = [];

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
        
                case "name": {
                    this.name = res[property];
                    break;
                }

                case "description": {
                    this.description = res[property];
                    break;
                  }
        
                case "Element": {
                    res[property].forEach((element: any) => {
                        this.sensorElements.push(new ISensorElement(element));
                    })
                    break;
                }

                case "RoV": {
                    res[property].forEach((element: any) => {
                        this.rovs.push(new IRoV(element));
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