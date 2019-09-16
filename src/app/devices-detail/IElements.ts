import { IUnit } from "../interfaces/IUnit";

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