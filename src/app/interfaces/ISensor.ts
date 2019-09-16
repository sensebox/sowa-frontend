import { IIri } from "./IIri";
import { IElements } from "../devices-detail/IElements";
import { IDevices } from "./IDevices";

export class ISensor {
    iri: {
        type: string,
        value: string
    };
    labels?: IIri[];
    description: {
        type: string;
        value: string;
        "xml:lang": string;
    };
    sensorElements?: IElements[];
    devices?: IDevices[];
    manufacturer: {
        type: string,
        value: string
    };
    price: {
        type: string,
        value: string
    };
    datasheet: {
        type: string,
        value: string
    };
    lifeperiod: {
        type: string,
        value: string
    };
    image: {
        type: string,
        value: string
    };


}