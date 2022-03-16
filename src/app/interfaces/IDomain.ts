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

        for (let property in res) {
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



        // res.forEach((element: any) => {
        //     switch (Object.getOwnPropertyNames(element)[0]) {

        //         case "description": {
        //             Object.assign(this, element);
        //             break;
        //         }

        //         case "iri": {
        //             Object.assign(this, element);
        //             break;
        //         }

        //         case "label": {
        //             this.labels.push(new ILabel(element));
        //             break;
        //         }

        //         case "phenomenon": {
        //             this.phenomenon.push(new IPhenomena(element));
        //             break;
        //         }

        //         case "validation": {
        //             Object.assign(this, element);
        //             break;
        //         }


        //         default: {
        //             break;
        //         }
        //     }
        // })
    }
}
