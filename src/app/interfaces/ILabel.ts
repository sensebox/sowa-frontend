export class ILabel {
        text: string;
        languageCode: string;
        translationId: number;

    constructor(resLabel: any) {
        this.text = resLabel.text;
        this.languageCode = resLabel.languageCode;
        this.translationId = resLabel.translationId;
    }
};