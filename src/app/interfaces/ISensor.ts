export interface ISensor {
    sensors: {
        type: string,
        value: string,
    };
    sensorsLabel: {
        type: string;
        value: string;
        "xml:lang": string;
    };
}