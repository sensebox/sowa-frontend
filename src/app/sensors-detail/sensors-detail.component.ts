import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ISensor } from '../interfaces/ISensor';

@Component({
  selector: 'senph-sensors-detail',
  templateUrl: './sensors-detail.component.html',
  styleUrls: ['./sensors-detail.component.scss', '../app.component.scss']
})
export class SensorsDetailComponent implements OnInit {
  sensor: ISensor;
  uri;
  // price= {value: []};
  // manufacturer = {value: []};
  // lifeperiod= {value: []};
  // image = {value: []};
  // datasheet= {value: []};
  // phenomena = [];
  // uri = {iri: [], labels: [], descriptions : [], short: []};
  // max;


  constructor(
    private route:ActivatedRoute,
    private api:ApiService,
    private _routerService:Router
  ) { }

  ngOnInit() {
  this.getSensorDetails();
  }

  // relativeLink(id){
  //   console.log("/sensor/"+ this.uri.iri.slice(33) );
  // }

  getSensorDetails() {
    return this.route.params.subscribe( res => {
      this.api.getSensor(res.iri).subscribe((response: ISensor) => {
        console.log(response);
        this.sensor = response;
        this.uri = this.sensor.iri[0].value.slice(34);
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

  


}
