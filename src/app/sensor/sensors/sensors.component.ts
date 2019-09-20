import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'senph-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss', '../../app.component.scss']
})
export class SensorsComponent implements OnInit {

  sensorsArray;
  selectedSensor;
  sensorsArrayFiltered;

  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getSensors().subscribe(res => {
      this.sensorsArray = res;
      this.sensorsArray = this.sensorsArray.filter(function (el) {
        console.log(el);
        return (el.label != undefined && el.label[0] != undefined)
      })
      // console.log(this.sensorsArray);
      this.sensorsArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      console.dir(this.sensorsArray);
      this.assignCopy();
    });
  }

  onSelect(sensor) {
    this.selectedSensor = sensor;
    this._routerService.navigate(['/sensor/detail/', sensor.sensor.value.slice(34)]);

  }

  log(sensors) {
    console.dir(sensors);
  }

  assignCopy() {
    this.sensorsArrayFiltered = Object.assign([], this.sensorsArray);
  }
  filterItem(value) {
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.sensorsArrayFiltered = Object.assign([], this.sensorsArray).filter(
      sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
  createRoute(i) {
    return (['/sensor', this.sensorsArray[i].sensor.value.slice(34)]);
  }
}
