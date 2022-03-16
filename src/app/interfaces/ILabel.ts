export class ILabel {
        text: string;
        languageCode: string;

    constructor(reslabel: any) {
        this.text = reslabel.text;
        this.languageCode = reslabel.languageCode;
    }
};