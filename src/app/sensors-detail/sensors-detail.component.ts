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
        this.uri = this.sensor.iri.value.slice(34);
        console.log(this.uri);
      });
    })
    // this.route.params.subscribe(res => {
    // // var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
    // this.api.getSensorIRI(res.iri).subscribe((res:Array<any>) => {
    //   res.forEach(element => {
    //     switch (Object.getOwnPropertyNames(element)[0]) {
          
    //       case "price" : {
    //         switch(element.price.value){
              
    //           case "1" : {
    //             this.price.value.push("$");
    //             break;
    //           }
    //           case "2" : {
    //             this.price.value.push("$$");
    //             break;
    //           }
    //           case "3" : {
    //             this.price.value.push("$$$");
    //             break;
    //           }
    //           default: {
    //             this.price.value.push("unkown");
    //             break;
    //           }
    //         }
    //          break;
    //       }
         
    //       case "manufacturer" : {
    //         this.manufacturer.value.push(element.manufacturer.value);
    //         break;
    //       }
          
    //       case "lifeperiod" : {
    //         this.lifeperiod.value.push(element.lifeperiod.value);
    //         break;            
    //       }

    //       case "image" : {
    //         this.image.value.push(element.image.value);
    //         break;
    //       }

    //       case "description" : {
    //           this.uri.descriptions.push(element.description.value);
    //           break;
    //       }
          
    //       case "datasheet" : {
    //           this.datasheet.value.push(element.datasheet.value);
    //           break;
    //       }

    //       case "phenomena" : {
            
    //         if(element.unit != undefined){
    //           this.phenomena.push({uri: element.phenomena.value, unit: element.unit.value, short: element.phenomena.value.slice(34)});
    //         }
    //         else{
    //           this.phenomena.push({uri: element.phenomena.value, unit: "unkown", short: element.phenomena.value.slice(34)});
    //         }
    //         break;
    //       }

    //       case "iri" : {
    //         this.uri.iri.push(element.iri.value);
    //         this.uri.short.push(element.iri.value.slice(34))
    //         this.uri.labels.push(element.label.value);
    //         break;
    //       }
         
    //       default: {
    //          console.log("Invalid attribute");
    //          break;
    //       }
    //    }

    //   });
    //   this.max = this.getMaxArrayLength();
    //   console.log(this.uri);
    //   })
    // });


  }
  
  // getMaxArrayLength(){
  // return Array(Math.max(
  //   this.manufacturer.value.length, 
  //   this.phenomena.length,
  //   this.uri.iri.length,
  //   this.uri.labels.length,
  //   this.uri.descriptions.length)).fill(0);
  // }

  redirectDomain(longURI, link) {
    this._routerService.navigate(['/', link, '/', longURI.slice(34)]);
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/sensor/edit', shortUri]);
  }

  


}
