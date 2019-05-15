import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss', '../app.component.scss']
})
export class SensorsComponent implements OnInit {

  sensorsArray;
  selectedSensor;
  sensorsArrayFiltered;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getSensors().subscribe(res => {
      this.sensorsArray=res;
      console.dir(this.sensorsArray);
      this.assignCopy();
    });
  }

  onSelect(sensor){
    this.selectedSensor = sensor; 
  }

  log(sensors) {
    console.dir(sensors);
  }

  assignCopy(){
    this.sensorsArrayFiltered = Object.assign([], this.sensorsArray);
 }
  filterItem(value){
      if(!value){
          this.assignCopy();
      } // when nothing has typed
      this.sensorsArrayFiltered = Object.assign([], this.sensorsArray).filter(
        sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
      )
  }
  createRoute(i){
    return(['/sensor', this.sensorsArray[i].sensor.value.slice(34) ]);
  }
}
