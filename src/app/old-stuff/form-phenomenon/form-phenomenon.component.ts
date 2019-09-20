//constructor() { }
import { Component, OnInit } from '@angular/core';
import { Phenomenon }    from '../../phenomenon';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'senph-form-phenomenon',
  templateUrl: './form-phenomenon.component.html',
  styleUrls: ['./form-phenomenon.component.scss']
})
export class FormPhenomenonComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
    // iri;
  languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  phenoModel = new Phenomenon(
    "",
    {
      label:"", 
      lang: this.languageTags[0].short
    }, 
    {
      comment: "", 
      lang: this.languageTags[0].short
    },
    "" ,
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
    this.api.updatePhenomenon(this.phenoModel).subscribe(res => {console.log(res)});
    this.diagnostic(this.phenoModel);
  }
  
  // TODO: Remove this when we're done
  diagnostic(model) { console.log(model); }
}