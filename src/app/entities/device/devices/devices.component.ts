import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IDevices } from 'src/app/interfaces/IDevices';

@Component({
  selector: 'senph-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss', '../../../app.component.scss']
})
export class DevicesComponent implements OnInit {
  faSearch = faSearch;
  devicesArray;
  selectedDevice;
  searchTerm;
  pageLoadActive = "0";


  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getDevices().subscribe(res => {
      // this.devicesArray = res;
      (err) => console.log(err);
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        // return (el.deviceLabel != undefined && el.deviceLabel[0] != undefined)
        return el.device.type === 'uri'

        // return (el.deviceLabel != undefined && el.deviceLabel[0] != undefined)
      })

      // console.log(this.devicessArray); 
      console.log(tempArray)
      tempArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      console.log(tempArray)
      this.devicesArray = Array.from(tempArray, x => new IDevices(x));
      console.dir(this.devicesArray);
      // this.assignCopy();
    });
  }

  onSelect(device) {
    this.acitivatePageLoad();
    this.selectedDevice = device;
    this._routerService.navigate(['/device/detail/', device.device.value.slice(34)]);

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
    return (['/device', this.devicesArray[i].device.value.slice(34)]);
  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }


}
