//constructor() { }
import { Component } from '@angular/core';
import { Phenomenon }    from '../hero';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'senph-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  languageTags = ['en', 'de',
            'es', 'it'];

  model = new Phenomenon({label:"", lang: this.languageTags[0]}, {comment: "", lang: this.languageTags[0]}, "" ,"");

  submitted = false;

  onSubmit() { 

    this.route.params.subscribe(res => {
      this.api.updatePhenomenon(res.iri, this.model).subscribe(res => console.log("Success"))
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}