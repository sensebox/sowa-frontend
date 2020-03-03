import { IPhenomenon } from '../../../interfaces/IPhenomenon';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { IDomains } from '../../../interfaces/IDomains';
import { IUnit } from '../../../interfaces/IUnit';
import { ILabel } from 'src/app/interfaces/ILabel';
import { LANGUAGES } from 'src/app/shared/mock-languages';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss', '../../../app.component.scss']
})
export class PhenomenaDetailComponent implements OnInit {
  phenomenon: IPhenomenon;
  uri;
  languageArray = LANGUAGES;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const shortUri = params.get('id');
  //     if (shortUri) {
  //       this.getPhenomenonDetails(shortUri);
  //     }
  //   });
  // }




  heroBannerString = "http://www.opensensemap.org/SENPH#";
  phenomenonForm: FormGroup;
  validationMessages = {
    'uri': {
      'required': 'URI is required.',
      'uriSyntax': 'No white spaces allowed in URI.'
    },
    'label': {
      'required': 'Label is required.'
    },
    'description': {
      'required': 'Description is required.'
    }
  };

  formErrors = {
  };

  ngOnInit() {
    // this.phenomenonForm = this.fb.group({
    //   uri: ['', [Validators.required, CustomValidators.uriSyntax]],
    //   label: this.fb.array([
    //     this.addLabelFormGroup()
    //   ]),
    //   description: [''],
    //   domain: this.fb.array([
    //     this.addDomainFormGroup()
    //   ]),
    //   unit: this.fb.array([
    //     this.addUnitFormGroup()
    //   ])
    // });

    // this.phenomenonForm.valueChanges.subscribe(
    //   (data) => {
    //     this.logValidationErrors(this.phenomenonForm);
    //   }
    // );

    // this.route.paramMap.subscribe(params => {
    //   console.log(params)
    //   const shortUri = params.get('iri');
    //   console.log(shortUri)
    //   if (shortUri) {
    //     this.getPhenomenon(shortUri);
    //   }
    // });
    // console.log(this.phenomenonForm.get('domain').controls);

    this.getPhenomenonDetails();
  }


  getPhenomenonDetails() {
    return this.route.params.subscribe(res => {
      this.api.getPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
        console.log(response);
        this.phenomenon = response;
        this.uri = this.phenomenon.iri.value.slice(34);
        console.log(this.uri);
      });
    })
  }

  redirectDomain(longURI) {
    console.log(longURI);
    this._routerService.navigate(['/domain/', longURI.slice(34)]);
  }

  editButtonClick(longUri) {
    this._routerService.navigate(['/phenomenon/edit', longUri.slice(34)]);
  }

  search(nameKey, myArray) {
    console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].val === nameKey["xml:lang"]) {
        console.log(myArray[i].show)
        return myArray[i].show;
      }
    }
  }
}


