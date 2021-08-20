export interface IUnit {
    unit: {
        type: string,
        value: string,
        min: number,
        max: number
    };
    unitLabel: {
        datatype: string;
        type: string;
        value: string;
    };
    min: {
        type: number,
        value: number
    };
    max: {
        type: number,
        value: number
    };
}