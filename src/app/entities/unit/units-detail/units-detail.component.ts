import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDevice } from '../../../interfaces/IDevice';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { ILabel } from 'src/app/interfaces/ILabel';
import { ISensors } from 'src/app/interfaces/ISensors';
import { redirectUnit } from 'src/app/shared/helpers/helper-functions';
import { environment } from 'src/environments/environment';
import { IUnit } from 'src/app/interfaces/IUnit';

@Component({
  selector: 'senph-units-detail',
  templateUrl: './units-detail.component.html',
  styleUrls: ['./units-detail.component.scss']
})
export class UnitsDetailComponent implements OnInit, AfterViewInit {
  unit: IUnit;
  uri;

  languageArray = LANGUAGES;
  unitHistory: Object;
  historic = {
    button1: undefined,
    button2: undefined
  };
  redirectUnit = redirectUnit;
  senphurl = 'http://sensors.wiki/SENPH#';

  APIURL = environment.api_url;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getUnitDetails();
  }

  ngAfterViewInit() {

  }

  getUnitDetails() {
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    if (this.historic.button2) {
      return this.route.params.subscribe(res => {
        this.api.getUnit(res.iri).subscribe((response: IUnit) => {
          this.unit = response;
          console.log(this.unit)
          // this.setPrefLabel();
          this.uri = this.unit.id;
          //this.uri = this.device.iri.value.slice(this.senphurl.length);
        });
      })
    }
    else {
      this.route.params.subscribe(res => {
        this.api.getHistoricDevice(res.iri).subscribe((response: IUnit) => {
          this.unit = response;
          this.uri = this.unit.name
          // this.uri = this.device.iri.value.slice(this.senphurl.length);
        });
      })
    }
  }

  button1(uri) {
    if (this.historic.button2) {
      this.editButtonClick(uri)
    }
    else {
      this.route.params.subscribe(res => {
        this._routerService.navigate(['/unit/detail/', res.uri]);
      })
    }
  }
  
  editButtonClick(shortUri) {
    this._routerService.navigate(['/unit/edit', this.unit.slug]);
  }

}
