import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss']
})
export class PhenomenaComponent implements OnInit {

  phenomenaArray;
  
  phenomenon;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray=res;
      console.log(res);
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
}
