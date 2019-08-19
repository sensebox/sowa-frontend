import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss', '../app.component.scss']
})
export class DevicesComponent implements OnInit {

devicesArray;
devicesArrayFiltered;
selectedDevice;


constructor( private api:ApiService) { }

ngOnInit() {
  this.api.getDevices().subscribe(res => {
    this.devicesArray=res;
    (err) => console.log(err);
    console.dir(res);
    this.assignCopy();
  });
}

onSelect(device){
  this.selectedDevice = device; 
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
