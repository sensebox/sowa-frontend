import { ILabel } from './ILabel';
import { IPhenomena } from './IPhenomena';

export class IDomain {
    id: number;
    slug: string
    labels: ILabel[];
    description: Object;
    validation: boolean;
    phenomena: IPhenomena[];
    

    constructor(res: any) {
        this.labels = [];
        this.phenomena = [];

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
