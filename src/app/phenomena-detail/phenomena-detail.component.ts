import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss']
})
export class PhenomenaDetailComponent implements OnInit {

  phenomenon;
  sensors = {iri: []};
  domains = {iri: []};
  units = {iri: []};
  uri = {iri: [], labels: [], descriptions : []};

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(res => {
    //   var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
    //   console.log(q);
    //   this.api.getPhenomenonIRI(q).subscribe(res => {
    //     this.phenomenon=res;
    //     console.log(this.phenomenon);

    //   })
    // });
    this.getPhenomenon();
  }

  
  getPhenomenon() {
  this.route.params.subscribe(res => {
    var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
    this.api.getPhenomenonIRI(q).subscribe((res:Array<any>) => {
      console.log(res);
      res.forEach(element => {
        if(element.sensors != undefined){
            this.sensors.iri.push(element.sensors.value);
        }
        else{
          if(element.domains != undefined){
              this.domains.iri.push(element.domains.value);
          }
          else{
            if(element.units != undefined){
                this.units.iri.push(element.units.value);
            }
            else{
              if(element.iri != undefined){
                  this.uri.iri.push(element.iri.value);
                  this.uri.labels.push(element.label);
              } 
              else{
                if(element.description != undefined){
                    this.uri.descriptions.push(element.description.value);
                }
              }
            } 
          }
        }  
      });
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
      console.log(this.uri);
      this.phenomenon=res; 
      })
    });
  } 



}
