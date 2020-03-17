import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { IDomains } from '../../../interfaces/IDomains';
import { IUnit } from '../../../interfaces/IUnit';
import { ILabel } from 'src/app/interfaces/ILabel';

@Component({
  selector: 'senph-phenomena-edit',
  templateUrl: './phenomena-edit.component.html',
  styleUrls: ['./phenomena-edit.component.scss']
})
export class PhenomenaEditComponent implements OnInit {
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
  shortUri: string;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
    ) { }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      domain: this.fb.array([
        this.addDomainFormGroup()
      ]),
      unit: this.fb.array([
        this.addUnitFormGroup()
      ])
    });

    this.phenomenonForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.phenomenonForm);
      }
    );

    this.route.paramMap.subscribe(params => {
      this.shortUri = params.get('id');
      if (this.shortUri) {
        this.getPhenomenon(this.shortUri);
      }
    });
  }


  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== ''|| this.submitted)) {
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

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domainUri: ['', [Validators.required]]
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: ['', [Validators.required]]
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      type: "literal",
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }


  getPhenomenon(shortUri) {
    this.api.getPhenomenon(shortUri).subscribe(
      (phenomenon) => this.editPhenomenon(phenomenon),
      (err: any) => console.log(err)
    );
  }

  editPhenomenon(phenomenon) {
    // console.log(phenomenon);
    this.phenomenonForm.patchValue({
      uri: phenomenon.iri.value.slice(34),
      description: phenomenon.description.value
    });
    this.phenomenonForm.setControl('label', this.setExistingLabels(phenomenon.labels))

    this.phenomenonForm.setControl('domain', this.setExistingDomains(phenomenon.domains))

    this.phenomenonForm.setControl('unit', this.setExistingUnits(phenomenon.units))
  }

  setExistingDomains(domainSet: IDomains[]): FormArray {
    const formArray = new FormArray([]);
    domainSet.forEach(s => {
      formArray.push(this.fb.group({
        domainUri: [s.domain.value, [Validators.required]]
      }));
    });

    return formArray;
  }

  setExistingUnits(unitSet: IUnit[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(unitSet);

    unitSet.forEach(s => {
      formArray.push(this.fb.group({
        unitUri: [s.unit.value, [Validators.required]]
      }));
    });

    return formArray;
  }

  setExistingLabels(labelSet: ILabel[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: [s.type, [Validators.required]],
        value: [s.value, [Validators.required]],
        lang: [s["xml:lang"], [Validators.required]]
      }));
    });

    return formArray;
  }

  redirectDetails(uri){
    this._routerService.navigate(['/phenomenon/detail', uri]);
  }

  onLoadButtonClick() {
    console.log(this.phenomenonForm.controls);
  }

  onSubmit() {
    console.log(this.phenomenonForm.value);
    this.submitted = true;


    if (this.phenomenonForm.invalid) {
      console.log("invalid");
    }
    else {
      console.log("valid");
      this.api.editPhenomenon(this.phenomenonForm.value).subscribe(
        (res) => {
         console.log(res) 
        },
        (error: any) => console.log(error)
      );
    }
    // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
    // this.diagnostic(this.phenomenonForm);
  }
}


