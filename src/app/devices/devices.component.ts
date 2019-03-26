import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  devicesArray;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getDevices().subscribe(res => {
      this.devicesArray=res;
      console.dir(res);
    });
  }

}
