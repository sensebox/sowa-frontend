import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDevice } from '../interfaces/IDevice';
import { ISensor } from '../interfaces/ISensor';

@Component({
  selector: 'senph-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss', '../app.component.scss']
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
    // console.log(this.device);

    // console.log(this.device);
  }
  
  ngAfterViewInit() {
    // console.log(this.device);
    // this.uri = this.device.iri.value.slice(34);
    // console.log(this.uri);
  }

  getDeviceDetails() {
    return this.route.params.subscribe( res => {
      this.api.getDevice(res.iri).subscribe((response: IDevice) => {
      // let device = response;
      this.device = response;
      this.uri = this.device.iri.value.slice(34);
      console.log(this.uri);
      // console.log(device.website);
      // console.log(this.device);
      // this.uri = this.device.website;
        // (res:Array <any>) => {
        // console.log(res);
        // res.forEach((element: any) => {
        //   if(Object.getOwnPropertyNames(element)[0] !== "sensors"){
        //     Object.assign(this.I2Device, element);
        //   } else {
        //     this.I2Device.sensors.push(Object.assign(this.sensor, element));
        //   }
        //   this.device = this.I2Device;



        //   switch (Object.getOwnPropertyNames(element)[0]) {
  
        //     case "description" : {
        //         this.descriptions.push({value: element.description.value, lang: element.description["xml:lang"]});
        //         break;
        //     }

        //     case "iri" : {
        //       this.uri.push({ iri: element.iri.value, short: element.iri.value.slice(34)});
        //       break;
        //     }
            
        //     case "label" : {
        //       this.names.push({label: element.label.value, lang: element.label["xml:lang"]});
        //       break;
        //     }
           

        //     case "sensors" : {
        //       this.sensors.push({ iri: element.sensors.value, label: element.sensorsLabel.value, short: element.sensors.value.slice(34)});
        //       break;
        //     }
            
        //     case "website" : {
        //       this.website.push({iri: element.website.value});
        //       break;
        //     }
            
        //     case "image" : {
        //       this.image.push({ iri: element.image.value});
        //       break;
        //     }

        //     case "contact" : {
        //       this.contact.push({ iri: element.contact.value});
        //       break;
        //     }
        //     default: {
        //        console.log("Invalid attribute");
        //        break;
        //     }
        //  }
  
        });
      })
        // console.log(JSON.stringify(this.I2Device, null, 2));
      // console.log(this.device);
      //   console.log(this.uri);

      // })
    // })
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/device/edit', shortUri]);
  }

}
