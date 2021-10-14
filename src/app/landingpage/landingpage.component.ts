import { Component, OnInit, ViewChildren } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';

@Component({
  selector: 'senph-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  
  entityArray;
  selectedEntity;
  searchTerm;
  filterOptionsArray = ['phenomenon', "sensor", "domain", "device"];
  sortCategory = 'label';
  sortAsc = true;

  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getAllEntities().subscribe(res => {
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        return el.entity.type != 'bnode'
      })
      // console.log(tempArray);
      tempArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      this.entityArray = tempArray;
    });
  }

  onSelect(entity) {
    this.selectedEntity = entity;
    this._routerService.navigate(['/' + entity.type.value.slice(34) + '/detail/', entity.entity.value.slice(34)]);
  }

  sortBy(category, array) {
    if (this.sortCategory != category || !this.sortAsc) {
      array.sort((a, b) => a[category].value.localeCompare(b[category].value));
      this.sortCategory = category;
      this.sortAsc = true;
      // console.log(array);
    }
    else {
      array.sort((a, b) => b[category].value.localeCompare(a[category].value));
      this.sortAsc = false;
      // console.log(array);

    }
  }


  onFilterChange(e) {
    if (e.target.checked) {
      var tempArray = this.filterOptionsArray;
      tempArray.push(e.target.value);
      this.filterOptionsArray = Object.assign([], tempArray);
    }
    else {
      this.filterOptionsArray = this.filterOptionsArray.filter(item => item !== e.target.value);

    }
    console.log(this.filterOptionsArray);
  }

}
