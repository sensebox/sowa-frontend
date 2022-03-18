import { Pipe, PipeTransform } from '@angular/core';
//import { IPhenomena } from '../interfaces/IPhenomena';
//import { GenericEntityLabel } from '../interfaces/generic-entity-label';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(filterArray: Object[], searchTerm: string): Object[] {
    console.log(filterArray)
    if (!filterArray || !searchTerm) {
      return filterArray;
    }
    console.log(filterArray)
    return filterArray.filter(element => {
      // console.log(element)
      let translationArray = Object.values(element)[1];
      console.log(translationArray)
      if (translationArray.length > 1) {
        for (let i = 0; i < translationArray.length; i++) {
          if(translationArray[i].languageCode === "en") {
            console.log(translationArray[i].text);
            return (translationArray[i].text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
          }
        }
      } else {
        return (translationArray[0].text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      }


      
      // return (translationArray[0].text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      // console.log(array)


      // for (let obj of Object.values(element)) {
        // return ((Array.isArray(element) && array[1].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        //   || (!Array.isArray(element)) && array[1].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      // }
    })
  }

}
