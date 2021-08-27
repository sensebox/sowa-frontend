import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDevice } from '../../../interfaces/IDevice';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { ILabel } from 'src/app/interfaces/ILabel';
import { ISensors } from 'src/app/interfaces/ISensors';
import { redirectDomain } from 'src/app/shared/helpers/helper-functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'senph-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss', '../../../app.component.scss']
})
export class DevicesDetailComponent implements OnInit, AfterViewInit {
  device: IDevice;
  // I2Device = {
  //   website: '',
  //   labels: '',
  //   image: '',
  //   description: '',
  //   contact: '',
  //   iri: {
  //     type: '',
  //     value: ''
  //   },
  //   sensors:[]
  // };
  // sensor = {
  //   sensors: '',
  //   sensorsLabel: ''
  // };
  uri;
  // names = [];
  // descriptions = [];
  // sensors =[];
  // website =[];
  // image =[];
  // contact =[];

  languageArray = LANGUAGES;
  deviceHistory: Object;
  historic = {
    button1: undefined,
    button2: undefined
  };
  prefLabel: ILabel;
  sensorsArray;
  redirectDomain = redirectDomain;

  APIURL = environment.api_url;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getDeviceDetails();
    this.retrieveSensors();

  }

  ngAfterViewInit() {

  }

  getDeviceDetails() {
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    if (this.historic.button2) {
      return this.route.params.subscribe(res => {
        this.api.getDevice(res.iri).subscribe((response: IDevice) => {
          this.device = response;
          this.setPrefLabel();
          this.uri = this.device.iri.value.slice(34);
        });
      })
    }
    else {
      this.route.params.subscribe(res => {
        this.api.getHistoricDevice(res.iri).subscribe((response: IDevice) => {
          this.device = response;
          this.setPrefLabel();
          this.uri = this.device.iri.value.slice(34);
        });
      })
    }
  }
  
  setPrefLabel(){
    this.device.labels.forEach(element => {
      if (element["xml:lang"] == "en") {
        this.prefLabel = element
        return
      }
      this.prefLabel = element;
    });
  }

  button1(uri) {
    if (this.historic.button2) {
      this.editButtonClick(uri)
    }
    else {
      this.route.params.subscribe(res => {
        this._routerService.navigate(['/device/detail/', res.uri]);
      })
    }
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/device/edit', shortUri]);
  }

  redirectHistoricDetails(uri, historicUri) {
    this._routerService.navigate(['/device/detail/' + uri + '/historic', historicUri.slice(34)]);
  }

  getHistory(shortUri) {
    this.api.getDeviceHistory(shortUri).subscribe(res => {
      this.deviceHistory = res;
    });
  }

  search(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1] === nameKey) {
        return myArray[i][val2];
      }
    }
  }

  searchPheno(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1].value === nameKey) {
        return myArray[i][val2][0].value;
      }
    }
  }

  retrieveSensors() {
    this.api.getSensors().subscribe(res => {
      var tempArray: any = res;
      tempArray = tempArray.filter(function (el) {
        return el.sensor.type != 'bnode'
      })
      // console.log(this.sensorsArray);
      this.sensorsArray = Array.from(tempArray, x => new ISensors(x));
      // console.dir(this.sensorsArray);
    });
  }

}
