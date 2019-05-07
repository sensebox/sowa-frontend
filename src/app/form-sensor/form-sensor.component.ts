import { Component, OnInit } from '@angular/core';
import { Sensor }    from '../phenomenon';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'senph-form-sensor',
  templateUrl: './form-sensor.component.html',
  styleUrls: ['./form-sensor.component.scss']
})
export class FormSensorComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
    // iri;
  languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  sensorModel = new Sensor(
    { label: "",
      lang: this.languageTags[0].short},
    { comment: "",
      lang: this.languageTags[0].short},
    [{ phenomenon: "",
       uoa: 0}],
    "", 0, "", 0, "");  

  submitted = false;
  ngOnInit(){
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