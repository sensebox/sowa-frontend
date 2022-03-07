export class ILabel {
        text: string;
        languageCode: string;

    constructor(reslabel: any) {
        // console.log(reslabel)
        this.text = reslabel.text;
        this.languageCode = reslabel.languageCode;
    }
};