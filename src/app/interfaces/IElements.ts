import { IUnit } from "./IUnit";

export interface IElements {
    iri: {
        type: string,
        value: string
    }; 
    phenomenon: {
        uri: string,
        uoa: IUnit,
        accVal: number
         };
}