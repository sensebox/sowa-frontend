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
      for (let obj of Object.values(element)) {
        return ((Array.isArray(obj) && obj[0].value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
          || (!Array.isArray(obj)) && obj.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      }
    })
  }

}
