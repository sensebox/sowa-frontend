import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { Phenomenon } from '../phenomenon';
import { ApiService } from '../services/api.service'
import { ISensor } from '../interfaces/ISensor';
import { IDomain } from '../interfaces/IDomain';
import { IUnit } from '../interfaces/IUnit';

@Component({
  selector: 'senph-phenomena-edit',
  templateUrl: './phenomena-edit.component.html',
  styleUrls: ['./phenomena-edit.component.scss']
})
export class PhenomenaEditComponent implements OnInit {
  phenomenonForm: FormGroup;
  validationMessages = {
    'uri': {
      'required': 'URI is required.',
      'uriSyntax': 'No white spaces allowed in URI.'
    },
    'name': {
      'required': 'URI is required.'
    },
    'description': {
      'required': 'Description is required.'
    }
  };

  formErrors = {
    // 'uri': '',
    // 'name': '',
    // 'description': '',
    // 'website': '',
    // 'image': '',
    // 'contact': '',
    // 'sensorUri': '',
    // 'phenomenon': ''
  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      domain: this.fb.array([
        this.addDomainFormGroup()
      ]),
      unit: this.fb.array([
        this.addUnitFormGroup()
      ])
      // sensor: this.fb.group({
      //   sensorUri: ['', [Validators.required]],
      //   phenomenon: ['', [Validators.required]]
      // })
    })

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

  addDomainButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('domain')).push(this.addDomainFormGroup());
  }

  addUnitButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('unit')).push(this.addUnitFormGroup());
  }

  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
    // console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // else if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control)
      //     }
      //   }
      // }

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

  onLoadButtonClick() {
    const formGroupDomain = this.fb.group([
      new FormControl('domainUri', Validators.required),
      new FormControl('domainLabel', Validators.required),
    ]);

    const formArrayDomain = this.fb.array([
      new FormControl('domainUri', Validators.required),
      new FormControl('domainLabel', Validators.required),
    ]);
    const formGroupUnit = this.fb.group([
      new FormControl('unitUri', Validators.required),
      new FormControl('unitLabel', Validators.required),
    ]);

    const formArrayUnit = this.fb.array([
      new FormControl('unitUri', Validators.required),
      new FormControl('unitLabel', Validators.required),
    ]);

    console.log(formArrayDomain);
    console.log(formGroupDomain);
    console.log(formArrayUnit);
    console.log(formGroupUnit);
  }

  onSubmit() {
    console.log(this.phenomenonForm.value);
    // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
    // this.diagnostic(this.phenomenonForm);
  }

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domainUri: ['', [Validators.required]],
      domainLabel: ['', [Validators.required]]
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: ['', [Validators.required]],
      unitLabel: ['', [Validators.required]]
    });
  }


  removeDomainButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('domain')).removeAt(skillGroupIndex);
  }

  removeUnitButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('unit')).removeAt(skillGroupIndex);
  }

  getPhenomenon(shortUri) {
    this.api.getPhenomenon(shortUri).subscribe(
      (phenomenon) => this.editPhenomenon(phenomenon),
      (err: any) => console.log(err)
    );
  }

  editPhenomenon(phenomenon) {
    console.log(phenomenon);
    this.phenomenonForm.patchValue({
      uri: phenomenon.iri.value.slice(34),
      name: phenomenon.labels[0].label.value,
      description: phenomenon.description.value
    });

    this.phenomenonForm.setControl('domain', this.setExistingDomains(phenomenon.domains))

    this.phenomenonForm.setControl('unit', this.setExistingUnits(phenomenon.units))
  }

  setExistingDomains(domainSet: IDomain[]): FormArray {
    const formArray = new FormArray([]);
    domainSet.forEach(s => {
      formArray.push(this.fb.group({
        domainUri: s.domain.value,
        domainLabel: s.domainLabel.value
      }));
    });

    return formArray;
  }

  setExistingUnits(unitSet: IUnit[]): FormArray {
    const formArray = new FormArray([]);
    unitSet.forEach(s => {
      formArray.push(this.fb.group({
        unitUri: s.unit.value,
        unitLabel: s.unitLabel.value
      }));
    });

    return formArray;
  }

}


