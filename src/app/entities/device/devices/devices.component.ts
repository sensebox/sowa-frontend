import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IDevices } from 'src/app/interfaces/IDevices';

@Component({
  selector: 'senph-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  devicesArray;
  selectedDevice;
  searchTerm;
  pageLoadActive = "0";
  senphurl = 'http://sensors.wiki/SENPH#';


  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getDevices().subscribe(res => {
      // this.devicesArray = res;
      var tempArray: any = res;

      // tempArray = tempArray.filter(function (el) {
      //   // return (el.deviceLabel != undefined && el.deviceLabel[0] != undefined)
      //   return el.device.type === 'uri'

      //   // return (el.deviceLabel != undefined && el.deviceLabel[0] != undefined)
      // })

      // console.log(this.devicessArray);
      // tempArray.sort((a, b) => a.label.item[1].text.localeCompare(b.label.item[1].text));

      this.devicesArray = Array.from(tempArray, x => new IDevices(x));
      console.dir(this.devicesArray);
      // this.assignCopy();
    });
  }

  onSelect(device) {
    this.acitivatePageLoad();
    this.selectedDevice = device;
    this._routerService.navigate(['/device/detail/', device.device]);

  }

  // assignCopy() {
  //   this.devicesArrayFiltered = Object.assign([], this.devicesArray);
  // filterItem(value) {
  //   if (!value) {
  //     this.assignCopy();
  //   } // when nothing has typed
  //   this.devicesArrayFiltered = Object.assign([], this.devicesArray).filter(
  //     devices => JSON.stringify(devices).toLowerCase().indexOf(value.toLowerCase()) > -1
  //   )
  // }

  createRoute(i) {
    return (['/device', this.devicesArray[i].device.value.slice(this.senphurl.length)]);
  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }


}
