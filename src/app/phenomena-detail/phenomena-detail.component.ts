import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IPhenomenon } from '../interfaces/IPhenomenon';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss', '../app.component.scss']
})
export class PhenomenaDetailComponent implements OnInit {

  phenomenon: IPhenomenon;

  // sensors = [];
  // domains = [];
  // units = [];
  uri;
  // labels = []; 
  // descriptions = [];
  // URL = "";

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
  
  // getPhenomenon() {
  // this.route.params.subscribe(res => {
  //   URL = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
  //   var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
  //   this.api.getPhenomenon(q).subscribe((res:Array<any>) => {
  //     console.log(res);
  //     res.forEach(element => {
  //       if(element.sensors != undefined){
  //         this.sensors.push({ iri: element.sensors.value, label: element.sensorlabel.value, short: element.sensors.value.slice(34)});
  //       }
  //       else{
  //         if(element.domains != undefined){
  //           if(element.domainLabel != undefined){
  //             this.domains.push({ iri: element.domains.value, label: element.domainLabel.value});
  //           }
  //           else{
  //             this.domains.push({ iri: element.domains.value, label: "unkown"});
  //           }
  //         }
  //         else{
  //           if(element.units != undefined && element.units.type == "uri"){
  //               this.units.push({ iri: element.units.value});
  //           }
  //           else{
  //             if(element.iri != undefined){
  //                 this.uri.push({ iri: element.iri.value, short: element.iri.value.slice(34)});
  //                 this.labels.push({ iri: element.label.value});
  //             } 
  //             else{
  //               if(element.description != undefined){
  //                   this.descriptions.push({ iri: element.description.value});
  //               }
  //             }
  //           } 
  //         }
  //       }  
  //     });
      //this.labels=JSON.parse(res[0].labels.value);
      //console.dir(this.labels); 
      // console.log(res);
      // res.forEach(element => {
      //   if(element.sensors != undefined){
      //     if(this.sensors.iri.indexOf(element.sensors.value) === -1){
      //       this.sensors.iri.push(element.sensors.value);
      //       this.sensors.labels.push(JSON.parse(element.sensorLabels.value));
      //     }
      //   }
      //   if(element.domains != undefined){
      //     if(this.domains.iri.indexOf(element.domains.value) === -1){
      //       this.domains.iri.push(element.domains.value);
      //       this.domains.labels.push(JSON.parse(element.domainLabels.value));
      //     }
      //   }
      //   if(this.units.iri.indexOf(element.units.value) === -1){
      //     this.units.iri.push(element.units.value);
      //   }
      // });
      // this.labels=JSON.parse(res[0].labels.value);
      // console.dir(this.labels); 
  //     console.log(this.domains);
  //     this.phenomenon=res; 
  //     })
  //   });
  // } 

  // showUrl() {
  //   console.log(URL);
  // }
  redirectDomain(longURI) {
    this._routerService.navigate(['/domain/', longURI.slice(34)]);
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/phenomenon/edit', shortUri]);
  }
  // editButton(id) {
  //   this.router.navigate(['/edit', id]);
  // }



}
