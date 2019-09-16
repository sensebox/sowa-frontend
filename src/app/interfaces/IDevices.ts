import { IIri } from "./IIri";

export interface IDevices {
    iri: {
        type: string,
        value: string,
    },
    labels: IIri
}
   