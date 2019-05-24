import { Component, OnInit } from '@angular/core';
import { Sensor }    from '../phenomenon';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms'

@Component({
  selector: 'senph-form-sensor',
  templateUrl: './form-sensor.component.html',
  styleUrls: ['./form-sensor.component.scss']
})
export class FormSensorComponent implements OnInit {

  phenomenaList= [];


  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
  
  languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  sensorModel = new Sensor(
    "",
    { 
      label: "",
      lang: this.languageTags[0].short
    },
    { 
      comment: "",
      lang: this.languageTags[0].short
    },
    {
      phenomenon: [],
      uoa: []
    }
    ,
    "",
     0,
    "",
    "",
    "",
    ""
  );
    


  prices = [
    {value: 1, viewValue: "$ (less than 20$)"},
    {value: 2, viewValue: "$$ (20 to 100$)"},
    {value: 3, viewValue: "$$$ (more than 100$)"},
  ]

  submitted = false;
  ngOnInit(){
    this.route.params.subscribe(res => {
      this.api.getPhenomena().subscribe((res:Array<any>) => {
        res.forEach(element => {
          if(element.phenomenon.type == "uri" && element.label[0] != undefined){
            this.phenomenaList.push(element);
          }
        })
        console.log(this.phenomenaList);
      })
    });
    // this.route.params.subscribe(res => {
    //   this.iri = res.iri;
    // });
  }
  onSubmit() {
    this.api.updateSensor(this.sensorModel).subscribe(res => {console.log(res)});
    this.diagnostic(this.sensorModel);
  }

  // TODO: Remove this when we're done
  diagnostic(model) { console.log(model); }
}