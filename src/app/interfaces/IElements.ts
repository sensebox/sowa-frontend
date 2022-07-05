import { IRoV } from "./IRoV";

export interface IElements {
    iri: {
        type: string,
        value: string
    }; 
    phenomenon: {
        uri: string,
        uoa: IRoV,
        accVal: number
         };
}