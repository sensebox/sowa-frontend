import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss', '../../app.component.scss']
})
export class PhenomenaComponent implements OnInit {

  phenomenaArray;
  phenomenaArrayFiltered;
  selectedPhenomenon;

  constructor( 
      private api:ApiService,
      private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
        console.log(res);
      this.phenomenaArray=res;
    
      this.phenomenaArray =  this.phenomenaArray.filter(function (el){
        return el.phenomenon.type != 'bnode'
      })
      // console.log(this.phenomenaArray);
      this.phenomenaArray.sort((a,b) => a.label[0].value.localeCompare(b.label[0].value));

      console.log(this.phenomenaArray);
      this.assignCopy();
    });
  }

  onSelect(phenomenon){
    this.selectedPhenomenon = phenomenon;
    this._routerService.navigate(['/phenomenon/detail/', phenomenon.phenomenon.value.slice(34)]);
  }

  assignCopy(){
    this.phenomenaArrayFiltered = Object.assign([], this.phenomenaArray);
 }
  filterItem(value){
      if(!value){
          this.assignCopy();
      } // when nothing has typed
      this.phenomenaArrayFiltered = Object.assign([], this.phenomenaArray).filter(
        sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
      )
  }
}
