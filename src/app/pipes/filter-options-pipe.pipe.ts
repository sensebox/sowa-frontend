import { Pipe, PipeTransform } from '@angular/core';
import { GenericEntityLabel } from '../interfaces/generic-entity-label';

@Pipe({
  name: 'filterOptionsPipe'
})
export class FilterOptionsPipePipe implements PipeTransform {

  transform(filterArray: any[], filterOptions: string[]): any[] {
    if (!filterArray) {
      return filterArray;
    }

    return filterArray.filter(element => {
      return filterOptions.indexOf(element.type.value.slice(34).toLowerCase()) > -1;
    })
  }

}
