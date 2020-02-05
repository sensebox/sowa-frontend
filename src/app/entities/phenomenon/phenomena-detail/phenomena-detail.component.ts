import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IPhenomenon } from '../../../interfaces/IPhenomenon';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss', '../../../app.component.scss']
})
export class PhenomenaDetailComponent implements OnInit {
  phenomenon: IPhenomenon;
  uri;


  constructor(
    private route:ActivatedRoute,
    private api:ApiService,
    private _routerService:Router
  ) { }

  ngOnInit() {
    this.getPhenomenonDetails();
  }


  getPhenomenonDetails() {
    return this.route.params.subscribe( res => {
      this.api.getPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
        this.phenomenon = response;
        this.uri = this.phenomenon.iri.value.slice(34);
        console.log(this.uri);
      });
    })
  }
  
  redirectDomain(longURI) {
    this._routerService.navigate(['/domain/', longURI.slice(34)]);
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/phenomenon/edit', shortUri]);
  }


}
