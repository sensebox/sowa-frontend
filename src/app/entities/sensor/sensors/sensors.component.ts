import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { ISensors } from 'src/app/interfaces/ISensors';

@Component({
  selector: 'senph-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  sensorsArray;
  selectedSensor;
  searchTerm;
  pageLoadActive = "0";
  senphurl = 'http://sensors.wiki/SENPH#';

  constructor(
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.api.getSensors().subscribe(res => {
      console.log(res)
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.sensorsArray = Array.from(tempArray, x => new ISensors(x));
      console.dir(this.sensorsArray);

    });
  }

  onSelect(sensor) {
    this.acitivatePageLoad();
    this.selectedSensor = sensor;
    this._routerService.navigate(['/sensor/detail/', sensor.sensorSlug]);

  }

  log(sensors) {
    console.dir(sensors);
  }

  createRoute(i) {
    return (['/sensor', this.sensorsArray[i].sensor.value.slice(this.senphurl.length)]);
  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }
}
