import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDevice } from '../../../interfaces/IDevice';

@Component({
  selector: 'senph-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss', '../../../app.component.scss']
})
export class DevicesDetailComponent implements OnInit, AfterViewInit {
  device: IDevice;
  I2Device = {
    website: '',
    labels: '',
    image: '',
    description: '',
    contact: '',
    iri: {
      type: '',
      value: ''
    },
    sensors:[]
  };
  sensor = {
    sensors: '',
    sensorsLabel: ''
  };
  uri;
  names = [];
  descriptions = [];
  sensors =[];
  website =[];
  image =[];
  contact =[];

  constructor(
    private route:ActivatedRoute,
    private api:ApiService,
    private _routerService: Router
  ) { }

 ngOnInit() {
    this.getDeviceDetails();
  }
  
  ngAfterViewInit() {

  }

  getDeviceDetails() {
    return this.route.params.subscribe( res => {
      this.api.getDevice(res.iri).subscribe((response: IDevice) => {
        this.device = response;
        this.uri = this.device.iri.value.slice(34);
        console.log(this.uri);
      });
    })
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/device/edit', shortUri]);
  }

}
