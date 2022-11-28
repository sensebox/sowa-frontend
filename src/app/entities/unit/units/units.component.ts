import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IUnits } from 'src/app/interfaces/IUnits';

@Component({
  selector: 'senph-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  unitsArray;
  selectedUnit;
  searchTerm;
  pageLoadActive = "0";
  senphurl = 'http://units.wiki/SENPH#';

  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getUnits().subscribe(res => {
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.unitsArray = Array.from(tempArray, x => new IUnits(x));
      // console.log(this.unitsArray)
    });
  }

  onSelect(unit){
    this.acitivatePageLoad();
    this.selectedUnit = unit; 
    this._routerService.navigate(['/unit/detail/', unit.unitSlug]);

  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }

}
