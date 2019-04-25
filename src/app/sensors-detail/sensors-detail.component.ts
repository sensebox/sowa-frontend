import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-sensors-detail',
  templateUrl: './sensors-detail.component.html',
  styleUrls: ['./sensors-detail.component.scss']
})
export class SensorsDetailComponent implements OnInit {

  price= {value: []};
  manufacturer = {value: []};
  lifeperiod= {value: []};
  image = {value: []};
  datasheet= {value: []};
  phenomena = {uri: [], unit: []};
  uri = {iri: [], labels: [], descriptions : []};
  max;
  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
  this.getSensorDetails();
  }

  getSensorDetails() {
  this.route.params.subscribe(res => {
    var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
    this.api.getSensorIRI(q).subscribe((res:Array<any>) => {
      console.log(res);
      res.forEach(element => {
        if(element.price != undefined){
            this.price.value.push(element.price.value);
        }
        else{
          if(element.manufacturer != undefined){
              this.manufacturer.value.push(element.manufacturer.value);
          }
          else{
            if(element.lifeperiod != undefined){
                this.lifeperiod.value.push(element.lifeperiod.value);
            }
            else{
              if(element.image != undefined){
                  this.image.value.push(element.image.value);
              }
              else{
                if(element.datasheet != undefined){
                    this.datasheet.value.push(element.datasheet.value);
                }
                else{
                  if(element.iri != undefined){
                      this.uri.iri.push(element.iri.value);
                      this.uri.labels.push(element.label.value);
                  } 
                  else{
                    if(element.description != undefined){
                        this.uri.descriptions.push(element.description.value);
                    }
                    else{
                      if(element.phenomena != undefined){
                          this.phenomena.uri.push(element.phenomena.value);
                          this.phenomena.unit.push(element.unit.value);
                      }
                    }
                  }
                }
              }
            } 
          }
        }  
      });
      console.log(this.uri);
      this.max = this.getMaxArrayLength();
      console.log(this.max);  
      })
    });


  }
  
  getMaxArrayLength(){
  return Array(Math.max(
    this.manufacturer.value.length, 
    this.phenomena.uri.length,
    this.phenomena.unit.length,
    this.uri.iri.length,
    this.uri.labels.length,
    this.uri.descriptions.length)).fill(0);
  }

}
