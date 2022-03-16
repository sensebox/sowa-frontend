import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss']
})
export class PhenomenaComponent implements OnInit {

  phenomenaArray;
  selectedPhenomenon;
  searchTerm;
  senphurl = 'http://sensors.wiki/SENPH#';

  constructor(
      private api:ApiService,
      private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      var tempArray: any = res;
    
      // tempArray =  tempArray.filter(function (el){
      //   return el.phenomenon.type != 'bnode'
      // })
      tempArray.sort((a,b) => a.label.item[1].text.localeCompare(b.label.item[1].text));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
      console.dir(this.phenomenaArray);
    });
  }

  onSelect(phenomenon){
    this.selectedPhenomenon = phenomenon;
    // console.log(phenomenon)
    this._routerService.navigate(['/phenomenon/detail/', phenomenon.phenomenon]);
  }
}
