// {
//     "bindings": [
//         {
//             "website": { "type": "literal" , "datatype": "http://server/unset-base/string" , "value": "www.sensebox.de/en/" }
//           } ,
//           {
//             "label": { "type": "literal" , "xml:lang": "en" , "value": "senseBox:Edu" }
//           } ,
//           {
//             "image": { "type": "literal" , "datatype": "http://server/unset-base/string" , "value": "https://sensebox.de/images/senseBox_edu_500.png" }
//           } ,
//           {
//             "description": { "type": "literal" , "xml:lang": "en" , "value": "The senseBox:Edu is an DIY kit for an environmental monitoring station an digital learning." }
//           } ,
//           {
//             "contact": { "type": "literal" , "datatype": "http://server/unset-base/string" , "value": "Reedu GmbH" }
//           } ,
//           {
//             "sensors": { "type": "uri" , "value": "http://www.opensensemap.org/SENPH#HDC1080" } ,
//             "sensorsLabel": { "type": "literal" , "xml:lang": "en" , "value": "HDC1080" }
//           } ,
//           {
//             "iri": { "type": "uri" , "value": "http://www.opensensemap.org/SENPH#sensebox_edu" }
//           }
//     ]
// }

import { ISensor } from './ISensor'
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
    sensors?: ISensor[];

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