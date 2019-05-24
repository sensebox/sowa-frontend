//constructor() { }
import { Component, OnInit } from '@angular/core';
import { Device}    from '../phenomenon';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'senph-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
    // iri;
  languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  deviceModel = new Device(
    "",
    {
      label: "",
      lang: this.languageTags[0].short},
    { comment: "",
      lang: this.languageTags[0].short},
    "",
    "",
    "",
    ""
  );  

  submitted = false;
  ngOnInit(){
    // this.route.params.subscribe(res => {
    //   this.iri = res.iri;
    // });
  }
  onSubmit() { 
    // console.log(this.route);
    // console.log(this.model);
    this.api.updateDevice(this.deviceModel).subscribe(res => {console.log(res)});
    this.diagnostic(this.deviceModel);
  }

  // TODO: Remove this when we're done
  diagnostic(model) { console.log(model); }
}