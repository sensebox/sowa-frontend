import { ILabel } from './ILabel';
import { IPhenomena } from './IPhenomena';

export class IDomain {
    id: number;
    labels: ILabel[];
    description: Object;
    validation: boolean;
    phenomena: IPhenomena[];
    

    constructor(res: any) {
        this.labels = [];
        this.phenomena = [];

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
      
              case "phenomenon": {
                res[property].forEach((element: any) => {
                  this.phenomena.push(new IPhenomena(element));
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
