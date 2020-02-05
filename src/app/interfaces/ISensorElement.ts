import { ILabel } from './ILabel';

export class ISensorElement {
    sensorElement: {
        type: string,
        value: string
    };
    accVal: {
        datatype: string,
        type: string,
        value: string
    };
    phenomenon: {
        type: string,
        value: string
    };
    phenomenonName: ILabel[];
    unit: {
        type: string,
        value: string
    };

    constructor(resSensorElement: any) {
        console.log(resSensorElement)
        this.accVal = resSensorElement.accVal;
        this.phenomenon = resSensorElement.phenomenon;
        this.sensorElement = resSensorElement.sensorElement;
        this.unit = resSensorElement.unit;
        this.phenomenonName = resSensorElement.phenomenonName;
    }
};