import { Pipe, PipeTransform } from '@angular/core';
import { IPhenomena } from '../interfaces/IPhenomena';
import { GenericEntityLabel } from '../interfaces/generic-entity-label';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(filterArray: GenericEntityLabel[], searchTerm: string): GenericEntityLabel[] {
    if (!filterArray || !searchTerm) {
      return filterArray;
    }

    return filterArray.filter(element => {
      // console.log(element)
      let array = Object.values(element)
      return (array[1].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      // console.log(array)


      // for (let obj of Object.values(element)) {
        // return ((Array.isArray(element) && array[1].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        //   || (!Array.isArray(element)) && array[1].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      // }
    })
  }

}
