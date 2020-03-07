import { Pipe, PipeTransform } from '@angular/core';
import { GenericEntityLabel } from '../interfaces/generic-entity-label';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(filterArray: any[], searchTerm: string): any[] {
    if (!filterArray || !searchTerm) {
      return filterArray;
    }

    return filterArray.filter(element => {
      console.log((element.label.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      element.entity.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      element.type.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1))
      return (element.label.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        element.entity.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        element.type.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    })
  }

}
