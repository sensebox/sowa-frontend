import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelLanguagePipe'
})
export class LabelLanguagePipePipe implements PipeTransform {

  transform(translationArray: any[]): string {
    // console.log(translationArray)
    if (translationArray.length > 1) {
      for (let i = 0; i < translationArray.length; i++) {
        if(translationArray[i].languageCode === "en") {
          // console.log(translationArray[i].text);
          return translationArray[i].text;
        }
      }
    } else {
      return translationArray[0].text;
    }
  }
}
