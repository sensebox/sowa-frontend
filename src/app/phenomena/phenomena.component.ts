import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss', '../app.component.scss']
})
export class PhenomenaComponent implements OnInit {
  title = "Discover phenomena";
  subtitle = "Here you can find a list of all phenomena that are registered in SOWA";
  phenomenaArray;
  phenomenaArrayFiltered;
  selectedPhenomenon;

  constructor( 
      private api:ApiService,
      private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray=res;
      console.log(res);
      this.assignCopy();
    });
  }

  onSelect(phenomenon){
    this.selectedPhenomenon = phenomenon;
    this._routerService.navigate(['/phenomenon/', phenomenon.phenomenon.value.slice(34)]);
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
