import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, Form } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { Phenomenon } from '../../../phenomenon';
import { ApiService } from '../../../services/api.service'
import { ISensors } from '../../../interfaces/ISensors';
import { IDomain } from '../../../interfaces/IDomain';
import { IUnit } from '../../../interfaces/IUnit';
import { IIri } from '../../../interfaces/IIri';
import { LANGUAGES } from '../../../shared/mock-languages';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
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
      const shortUri = params.get('id');
      if (shortUri) {
        this.getPhenomenon(shortUri);
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
      // label: phenomenon.labels[0].label.value,
      description: phenomenon.description.value
    });
    this.phenomenonForm.setControl('label', this.setExistingLabels(phenomenon.labels))

    this.phenomenonForm.setControl('domain', this.setExistingDomains(phenomenon.domains))

    this.phenomenonForm.setControl('unit', this.setExistingUnits(phenomenon.units))
  }

  setExistingDomains(domainSet: IDomain[]): FormArray {
    const formArray = new FormArray([]);
    domainSet.forEach(s => {
      formArray.push(this.fb.group({
        domainUri: s.domain.value
      }));
    });

    return formArray;
  }

  setExistingUnits(unitSet: IUnit[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(unitSet);

    unitSet.forEach(s => {
      formArray.push(this.fb.group({
        unitUri: s.unit.value
      }));
    });

    return formArray;
  }

  setExistingLabels(labelSet: ILabel[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: s.type,
        value: s.value,
        lang: s["xml:lang"]
      }));
    });

    return formArray;
  }

  onLoadButtonClick() {
    console.log(this.phenomenonForm.controls);
    // const formGroupDomain = this.fb.group([
    //   new FormControl('domainUri', Validators.required),
    // ]);

    // const formArrayDomain = this.fb.array([
    //   new FormControl('domainUri', Validators.required),
    // ]);
    // const formGroupUnit = this.fb.group([
    //   new FormControl('unitUri', Validators.required),
    // ]);

    // const formArrayUnit = this.fb.array([
    //   new FormControl('unitUri', Validators.required),
    // ]);
    // const formGroupLabel = this.fb.group([
    //   new FormControl('value', Validators.required),
    //   new FormControl('lang', Validators.required),
    // ]);

    // const formArrayLabel = this.fb.array([
    //   new FormControl('value', Validators.required),
    //   new FormControl('lang', Validators.required),
    // ]);

    // console.log(formArrayDomain);
    // console.log(formGroupDomain);
    // console.log(formArrayUnit);
    // console.log(formGroupUnit);
  }

  onSubmit() {
    console.log(this.phenomenonForm.value);
    // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
    // this.diagnostic(this.phenomenonForm);
  }
}


