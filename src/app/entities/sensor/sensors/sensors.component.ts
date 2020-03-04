import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { ISensors } from 'src/app/interfaces/ISensors';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'senph-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss', '../../../app.component.scss']
})
export class SensorsComponent implements OnInit {
  faSearch = faSearch;
  sensorsArray;
  selectedSensor;
  searchTerm;
  pageLoadActive = "0";

  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getSensors().subscribe(res => {

      console.log(res);
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        // return (el.sensorLabel != undefined && el.sensorLabel[0] != undefined)
        return el.sensors.type === 'uri'

      })
      // console.log(this.sensorssArray);
      tempArray.sort((a, b) => a.sensorsLabel[0].value.localeCompare(b.sensorsLabel[0].value));
      console.log(tempArray)
      this.sensorsArray = Array.from(tempArray, x => new ISensors(x));
      console.dir(this.sensorsArray);
    });
  }

  onSelect(sensor) {
    this.acitivatePageLoad();
    this.selectedSensor = sensor;
    this._routerService.navigate(['/sensor/detail/', sensor.sensor.value.slice(34)]);

  }

  log(sensors) {
    console.dir(sensors);
  }

  createRoute(i) {
    return (['/sensor', this.sensorsArray[i].sensor.value.slice(34)]);
  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }
}
