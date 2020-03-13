import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ISensor } from '../../../interfaces/ISensor';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ILabel } from 'src/app/interfaces/ILabel';

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
  sElemUnitsArray: Array<any>;
  sensorHistory: Object;
  historic = {
    button1: undefined,
    button2: undefined
  };
  prefLabel: ILabel;


  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getSensorDetails()
    this.retrieveUnits()
    // let units = this.api.getUnits();
    // let sensorDetails = this.route.params
    // .pipe(mergeMap(res => this.api.getSensor(res.iri)));

    // console.log(units);
    // console.log(sensorDetails);


    // forkJoin(this.api.getUnits(), this.route.params.pipe(mergeMap(res => this.api.getSensor(res.iri)))).subscribe(results => {
    //   console.log(results[0]);
    //   var u  = results[0];
    //   var sD = new ISensor(results[1]);
    //   // console.log(sD);

    //   this.sensor = sD;
    //   this.uri = this.sensor.iri.value.slice(34);
    //   console.log(this.sensor);

    //   this.unitsArray = u;
    //   this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));

    //   this.sElemUnitsArray = new Array(this.sensor.sensorElements.length);
    //   for (var i = 0; i < this.sensor.sensorElements.length; i++) {
    //     this.sElemUnitsArray[i] = this.searchUnit(this.sensor.sensorElements[i].unit.value, this.unitsArray)
    //   }
    //   console.log(this.sElemUnitsArray);
    // });

  }


  getSensorDetails() {
    console.log(this._routerService.url)
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    console.log(this._routerService.url)
    if (this.historic.button2) {
      return this.route.params.subscribe(res => {
        console.log(res);
        this.api.getSensor(res.iri).subscribe((response: ISensor) => {
          console.log(response);
          console.log("NEW");
          this.sensor = response;
          this.sensor.labels.forEach(element => {
            console.log(element["xml:lang"])
            if(element["xml:lang"] == "en"){
            this.prefLabel = element
            return
            }
            this.prefLabel = element;
          });
          this.uri = this.sensor.iri.value.slice(34);
          // this.pushLabelNames(response);
          console.log(this.uri);
        });
      })
    }
    else {
      return this.route.params.subscribe(res => {
        console.log(res);
        this.api.getHistoricSensor(res.iri).subscribe((response: ISensor) => {
          console.log(response);
          console.log("HISTORIC");
          this.sensor = response;
          this.sensor.labels.forEach(element => {
            console.log(element["xml:lang"])
            if(element["xml:lang"] == "en"){
            this.prefLabel = element
            return
            }
          });
          this.uri = this.sensor.iri.value.slice(34);
          // this.pushLabelNames(response);
          console.log(this.uri);
        });
      })
    }
  }

  getSensorDetailsfork() {
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

  button1(uri) {
    console.log(this.historic)
    if (this.historic.button2) {
      this.editButtonClick(uri)
    }
    else {
      this.route.params.subscribe(res => {
        this._routerService.navigate(['/sensor/detail/', res.uri]);
      })
    }
  }
  editButtonClick(shortUri) {
    this._routerService.navigate(['/sensor/edit', shortUri]);
  }

  redirectHistoricDetails(uri, historicUri) {
    this._routerService.navigate(['/sensor/detail/' + uri + '/historic', historicUri.slice(34)]);
  }

  getHistory(shortUri) {
    this.api.getSensorHistory(shortUri).subscribe(res => {
      console.log(res);
      this.sensorHistory = res;
    });
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

  pushLabelNames(sensor) {
    for (var i = 0; i < sensor.sensorElements.length; i++) {
      console.log(sensor.sensorElements[i].unit.value)
      this.unitsArray[i] = this.retrieveUnit(sensor.sensorElements[i].unit.value);
    }
  }

  // TODO: PRUEFEN OB ES HIER SCHOENERE LOESUNG GIBT AN UNIT UND PHENOMENON NAMEN ZU KOMMEN!!
  retrieveUnit(iri) {
    this.api.getUnitLabel({ "uri": iri }).subscribe(res => {
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
