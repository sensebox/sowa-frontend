import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';

@Component({
  selector: 'senph-domain-edit',
  templateUrl: './domain-edit.component.html',
  styleUrls: ['./domain-edit.component.scss']
})
export class DomainEditComponent implements OnInit {

//   constructor(
//     private route:ActivatedRoute,
//     private api:ApiService
//   ) { }
//     // iri;
//   languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
//   {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

//   domainModel = new Domain(
//     "",
//     { 
//       label: "",
//       lang: this.languageTags[0].short
//     },
//     { 
//       comment: "",
//       lang: this.languageTags[0].short
//     }
//   );

//   submitted = false;
//   ngOnInit(){
//     // this.route.params.subscribe(res => {
//     //   this.iri = res.iri;
//     // });
//   }
//   onSubmit() { 
//     this.api.updateDomain(this.domainModel).subscribe(res => {console.log(res)});
//     this.diagnostic(this.domainModel);
//   }

//   // TODO: Remove this when we're done
//   diagnostic(model) { console.log(model); }
// }

  heroBannerString = "http://www.opensensemap.org/SENPH#";
  domainForm: FormGroup;

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

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      phenomenon: this.fb.array([
        this.addPhenomenonFormGroup()
      ])
    })

    this.domainForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.domainForm);
      }
    );

    this.route.paramMap.subscribe(params => {
      const shortUri = params.get('id');
      if (shortUri) {
        this.getDomain(shortUri);
      }
    });
  }


  logValidationErrors(group: FormGroup = this.domainForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }


  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      type: "literal",
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }

  addPhenomenonFormGroup(): FormGroup {
    return this.fb.group({
      phenomenonUri: ['', [Validators.required]]
    });
  }

  getDomain(shortUri) {
    this.api.getDomain(shortUri).subscribe(
      (domain) => this.editDomain(domain),
      (err: any) => console.log(err)
    );
  }

  editDomain(domain) {
    console.log(domain);
    this.domainForm.patchValue({
      uri: domain.iri.value.slice(34),
      description: domain.description.value,
    });

    this.domainForm.setControl('label', this.setExistingLabels(domain.labels))

    this.domainForm.setControl('phenomenon', this.setExistingPhenomena(domain.phenomenon))
  }

  setExistingPhenomena(phenomenaSet: IPhenomena[]): FormArray {
    const formArray = new FormArray([]);
    console.log(phenomenaSet);
    phenomenaSet.forEach(s => {
      formArray.push(this.fb.group({
        phenomenonUri: [s.phenomenon.value, [Validators.required]]
      }));
    });

    return formArray;
  }



  setExistingLabels(labelSet: ILabel[]): FormArray {
    const formArray = new FormArray([]);
    console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: [s.type, [Validators.required]],
        value: [s.value, [Validators.required]],
        lang: [s["xml:lang"], [Validators.required]]
      }));
    });

    return formArray;
  }

  onSubmit() {
    console.log(this.domainForm.value);
    this.api.editDomain(this.domainForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.domainForm);
  }
}


