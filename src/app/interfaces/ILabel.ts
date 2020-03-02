export class ILabel {
        type: string;
        value: string;
        "xml:lang": string;

    constructor(reslabel: any) {
        // console.log(reslabel)
        this.type = reslabel.label.type;
        this.value = reslabel.label.value;
        this["xml:lang"] = reslabel.label["xml:lang"];
    }
};