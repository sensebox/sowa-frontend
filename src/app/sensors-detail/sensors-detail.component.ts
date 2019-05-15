import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-sensors-detail',
  templateUrl: './sensors-detail.component.html',
  styleUrls: ['./sensors-detail.component.scss', '../app.component.scss']
})
export class SensorsDetailComponent implements OnInit {

  price= {value: []};
  manufacturer = {value: []};
  lifeperiod= {value: []};
  image = {value: []};
  datasheet= {value: []};
  phenomena = [];
  uri = {iri: [], labels: [], descriptions : [], short: []};
  max;
  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
  this.getSensorDetails();

// Avoid `console` errors in browsers that lack a console.
var method;
var noop = function () {};
var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
];
var length = methods.length;
// var console = (window.console = window.console || {});

while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
}

// Place any jQuery/helper plugins in here.

// $(document).ready(function(){
// $(".contentsPanel").each(function() {                
//   $(this).prepend('<div class="hidePanel">[hide]</div><div class="showPanel">[show]</div>');
// });


//   $(".hidePanel").click(function(){
//   $( this ).siblings('ul').hide( 150, function() { 
//     $(this).parent().addClass('minimizedPanel');
//   });
//   });
//   $(".showPanel").click(function(){
//   $( this ).siblings('ul').show( 150, function() { 
//     $(this).parent().removeClass('minimizedPanel');
//   });
//   });


// });


  }

  relativeLink(id){
    console.log("/sensor/"+ this.uri.iri.slice(33) );
  }

  getSensorDetails() {
  this.route.params.subscribe(res => {
    // var q = res.iri.replace("http://www.opensensemap.org/SENPH#", "");
    this.api.getSensorIRI(res.iri).subscribe((res:Array<any>) => {
      res.forEach(element => {
        switch (Object.getOwnPropertyNames(element)[0]) {
          
          case "price" : {
            switch(element.price.value){
              
              case "1" : {
                this.price.value.push("$");
                break;
              }
              case "2" : {
                this.price.value.push("$$");
                break;
              }
              case "3" : {
                this.price.value.push("$$$");
                break;
              }
              default: {
                this.price.value.push("unkown");
                break;
              }
            }
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
            
            if(element.unit != undefined){
              this.phenomena.push({uri: element.phenomena.value, unit: element.unit.value, short: element.phenomena.value.slice(34)});
            }
            else{
              this.phenomena.push({uri: element.phenomena.value, unit: "unkown", short: element.phenomena.value.slice(34)});
            }
            break;
          }

          case "iri" : {
            this.uri.iri.push(element.iri.value);
            this.uri.short.push(element.iri.value.slice(34))
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
      console.log(this.uri);
      })
    });


  }
  
  getMaxArrayLength(){
  return Array(Math.max(
    this.manufacturer.value.length, 
    this.phenomena.length,
    this.uri.iri.length,
    this.uri.labels.length,
    this.uri.descriptions.length)).fill(0);
  }



  


}
