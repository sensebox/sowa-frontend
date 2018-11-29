import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensorsArray;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getSensors().subscribe(res => {
      this.sensorsArray=res;
    });
  }
}
