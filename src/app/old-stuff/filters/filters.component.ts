import { Component, OnInit, ViewChildren, Input, QueryList } from '@angular/core';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { map, switchMap, mapTo } from 'rxjs/operators';


export interface Filter {
  id : string|string;
  title : string;
  active? : boolean;
}

export interface ActiveFilter {
  id : number|string;
  group : string;
}

@Component({
  selector: 'senph-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() group : string;
  @Input() filters : Filter[] = [];

  changeFilter;

  ngOnInit() {
    const initialFilter = this.filters.find(f => f.active);
    
    this.changeFilter = new BehaviorSubject<ActiveFilter>({
      group: this.group,
      id: initialFilter.id
    });
    
  }

  ngOnDestroy() {
    this.changeFilter.unsubscribe();
  }

  select( filter : Filter ) {
    console.dir(filter);
    console.log("filter");

    this.filters.forEach(filter => filter.active = false);
    filter.active = true;
    console.log(this.group);
    this.changeFilter.next({
      group: this.group,
      id: filter.id
    });
  }

}
