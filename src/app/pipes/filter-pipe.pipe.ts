import { Pipe, PipeTransform } from '@angular/core';
//import { IPhenomena } from '../interfaces/IPhenomena';
//import { GenericEntityLabel } from '../interfaces/generic-entity-label';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(filterArray: Object[], searchTerm: string): Object[] {
    // console.log(filterArray)
    if (!filterArray || !searchTerm) {
      return filterArray;
    }
    // console.log(filterArray)
    return filterArray.filter(element => {
      // console.log(element["label"].item)
      let translationArray = element["label"].item;
      // console.log(translationArray)
      if (translationArray.length > 1) {
        for (let i = 0; i < translationArray.length; i++) {
          if(translationArray[i].languageCode === "en") {
            // console.log(translationArray[i].text);
            return (translationArray[i].text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
          }
        }
      } else {
        return (translationArray[0].text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      }
    })
  }

}
