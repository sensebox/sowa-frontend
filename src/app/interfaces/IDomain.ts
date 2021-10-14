import { ILabel } from './ILabel';
import { IPhenomena } from './IPhenomena';

export class IDomain {
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
    phenomenon: IPhenomena[];
    validation: {
        datatype: string,
        type: string,
        value: string
    };

    constructor(res: any) {
        this.labels = [];
        this.phenomenon = [];

        res.forEach((element: any) => {
            switch (Object.getOwnPropertyNames(element)[0]) {

                case "description": {
                    Object.assign(this, element);
                    break;
                }

                case "iri": {
                    Object.assign(this, element);
                    break;
                }

                case "label": {
                    this.labels.push(new ILabel(element));
                    break;
                }

                case "phenomenon": {
                    this.phenomenon.push(new IPhenomena(element));
                    break;
                }

                case "validation": {
                    Object.assign(this, element);
                    break;
                }


                default: {
                    break;
                }
            }
        })
    }
}
