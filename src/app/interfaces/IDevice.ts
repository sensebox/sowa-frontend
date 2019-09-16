import { ISensors } from './ISensors'
import { IIri } from './IIri';
export class IDevice {
    website: {
        datatype: string;
        type: string;
        value: string;
    };
    labels?: IIri[];
    image: {
        datatype: string;
        type: string;
        value: string;
    };
    description: {
        type: string;
        value: string;
        "xml:lang": string;
    };
    contact: {
        datatype: string;
        type: string;
        value: string;
    };
    iri: {
        type: string,
        value: string,
    };
    sensors?: ISensors[];

    constructor(deviceResponse: any) {
        // console.log(deviceResponse);
        this.website = deviceResponse.website;
        this.labels = deviceResponse.labels;
        this.image = deviceResponse.image;
        this.description = deviceResponse.description;
        this.contact = deviceResponse.contact;
        this.iri = deviceResponse.iri;
        this.sensors = deviceResponse.sensors
    }
}