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
      res.forEach(element => {
        switch (Object.getOwnPropertyNames(element)[0]) {
          
          case "price" : {
            this.price.value.push(element.price.value);
             break;
          }
         
          case "manufacturer" : {
            this.manufacturer.value.push(element.manufacturer.value);
            break;
          }
          
          case "lifeperiod" : {
            this.lifeperiod.value.push(element.lifeperiod.value);
            break;            
          }

          case "image" : {
            this.image.value.push(element.image.value);
            break;
          }

          case "description" : {
              this.uri.descriptions.push(element.description.value);
              break;
          }
          
          case "datasheet" : {
              this.datasheet.value.push(element.datasheet.value);
              break;
          }

          case "phenomena" : {
            this.phenomena.uri.push(element.phenomena.value);

            if(element.unit != undefined){
              this.phenomena.unit.push(element.unit.value);
            }
            else{
              this.phenomena.unit.push("unknown");
            }
            break;
          }

          case "iri" : {
            this.uri.iri.push(element.iri.value);
            this.uri.labels.push(element.label.value);
            break;
          }
         
          default: {
             console.log("Invalid attribute");
             break;
          }
       }

      });
      this.max = this.getMaxArrayLength();
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
