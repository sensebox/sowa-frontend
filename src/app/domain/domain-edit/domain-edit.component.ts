import { Component, OnInit } from '@angular/core';
import { Domain }    from '../../phenomenon';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'senph-domain-edit',
  templateUrl: './domain-edit.component.html',
  styleUrls: ['./domain-edit.component.scss']
})
export class DomainEditComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
    // iri;
  languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  domainModel = new Domain(
    "",
    { 
      label: "",
      lang: this.languageTags[0].short
    },
    { 
      comment: "",
      lang: this.languageTags[0].short
    }
  );

  submitted = false;
  ngOnInit(){
    // this.route.params.subscribe(res => {
    //   this.iri = res.iri;
    // });
  }
  onSubmit() { 
    this.api.updateDomain(this.domainModel).subscribe(res => {console.log(res)});
    this.diagnostic(this.domainModel);
  }

  // TODO: Remove this when we're done
  diagnostic(model) { console.log(model); }
}