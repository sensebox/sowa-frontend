import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'senph-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss', '../../app.component.scss']
})
export class DevicesComponent implements OnInit {

devicesArray;
devicesArrayFiltered;
selectedDevice;


constructor( 
  private api:ApiService,
  private _routerService:Router
  ) { }

ngOnInit() {
  this.api.getDevices().subscribe(res => {
    this.devicesArray=res;
    (err) => console.log(err);
    this.devicesArray =  this.devicesArray.filter(function (el){
      return el.device.type != 'bnode'
    })
    // console.log(this.devicesArray);
    this.devicesArray.sort((a,b) => a.label[0].value.localeCompare(b.label[0].value));

    console.dir(res);
    this.assignCopy();
  });
}

onSelect(device){
  this.selectedDevice = device; 
  this._routerService.navigate(['/device/detail/', device.device.value.slice(34)]);

}

assignCopy(){
  this.devicesArrayFiltered = Object.assign([], this.devicesArray);
}
filterItem(value){
    if(!value){
        this.assignCopy();
    } // when nothing has typed
    this.devicesArrayFiltered = Object.assign([], this.devicesArray).filter(
      sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
    )
}
createRoute(i){
  return(['/device', this.devicesArray[i].device.value.slice(34) ]);
}
}
