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
  phenomenon;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray=res;
      console.log(res);
      this.assignCopy();
    });
  }

  getPhenomenon(iri) {
    var q = iri.replace("http://www.opensensemap.org/SENPH#", "");
    console.log(q);
    this.api.getPhenomenon(q).subscribe(res => {
      this.phenomenon=res;
      console.log(res);
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
