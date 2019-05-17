import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss', '../app.component.scss']
})
export class PhenomenaComponent implements OnInit {

  phenomenaArray;
  phenomenaArrayFiltered;
  selectedPhenomenon;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray=res;
      console.log(res);
      this.assignCopy();
    });
  }

  onSelect(phenomenon){
    this.selectedPhenomenon = phenomenon; 
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
