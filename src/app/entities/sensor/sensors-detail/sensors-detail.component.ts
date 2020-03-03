import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ISensor } from '../../../interfaces/ISensor';
import { LANGUAGES } from 'src/app/shared/mock-languages';

@Component({
  selector: 'senph-sensors-detail',
  templateUrl: './sensors-detail.component.html',
  styleUrls: ['./sensors-detail.component.scss', '../../../app.component.scss']
})
export class SensorsDetailComponent implements OnInit {
  sensor: ISensor;
  uri;
  languageArray = LANGUAGES;
  unitsArray;


  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.retrieveUnits();
    this.getSensorDetails();
  }


  getSensorDetails() {
    return this.route.params.subscribe(res => {
      this.api.getSensor(res.iri).subscribe((response: ISensor) => {
        console.log(response);
        this.sensor = response;
        this.uri = this.sensor.iri.value.slice(34);
        // this.pushLabelNames(response);
        console.log(this.uri);
      });
    })
  }

  redirectDomain(longURI, link) {
    this._routerService.navigate([link, longURI.slice(34)]);
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/sensor/edit', shortUri]);
  }

  searchUnit(nameKey, myArray) {
    console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i].y.value)
      if (myArray[i].y.value === nameKey) {
        console.log(myArray[i].label.value)
        return myArray[i].label.value;
      }
    }
  }

  search(nameKey, val, myArray) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val])
      if (myArray[i][val] === nameKey) {
        return myArray[i].show;
      }
    }
  }

  pushLabelNames(sensor){
    for (var i = 0; i < sensor.sensorElements.length; i++) {
        console.log(sensor.sensorElements[i].unit.value)
        this.unitsArray[i] = this.retrieveUnit(sensor.sensorElements[i].unit.value);
    }
  }

  // TODO: PRUEFEN OB ES HIER SCHOENERE LOESUNG GIBT AN UNIT UND PHENOMENON NAMEN ZU KOMMEN!!
  retrieveUnit(iri) {
    this.api.getUnitLabel({"uri": iri}).subscribe(res => {
     return res;
      // this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      // console.log(this.unitsArray);
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      // console.log(this.unitsArray);
    });
  }

}
