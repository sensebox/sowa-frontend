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
  sensors = {iri: [], labels: []};
  domains = {iri: [], labels: []};
  units = {iri: []};
  uri = {iri: [], labels: [], descriptions : []};

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.api.getPhenomenon(res.iri).subscribe((res:Array<any>) => {
        console.log(res);
        res.forEach(element => {
          if(element.sensors != undefined){
            if(this.sensors.iri.indexOf(element.sensors.value) === -1){
              this.sensors.iri.push(element.sensors.value);
              this.sensors.labels.push(element.sensorsLabel.value);
            }
            else {this.sensors.labels.push(element.sensorsLabel.value);}
          }
          else{
            if(element.domains != undefined){
              if(this.domains.iri.indexOf(element.domains.value) === -1){
                this.domains.iri.push(element.domains.value);
                this.domains.labels.push(element.domainsLabel.value);
              }
              else {this.domains.labels.push(element.domainsLabel.value);}
            }
            else{
              if(element.units != undefined){
                if(this.units.iri.indexOf(element.units.value) === -1){
                  this.units.iri.push(element.units.value);
                }
              }
              else{
                if(element.iri != undefined){
                  if(this.uri.iri.indexOf(element.iri.value) === -1){
                    this.uri.iri.push(element.iri.value);
                    this.uri.labels.push(element.label);
                  }
                  else{
                    this.uri.labels.push(element.label);
                  }
                } 
                else{
                  if(element.irid != undefined){
                    if(this.uri.iri.indexOf(element.irid.value) === -1){
                      this.uri.iri.push(element.irid.value);
                      this.uri.descriptions.push(element.description.value);
                    }
                    else{
                      this.uri.descriptions.push(element.description.value);
                    }
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
