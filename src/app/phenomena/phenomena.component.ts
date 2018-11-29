import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss']
})
export class PhenomenaComponent implements OnInit {

  phenomenaArray;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray=res;
    });
  }

}
