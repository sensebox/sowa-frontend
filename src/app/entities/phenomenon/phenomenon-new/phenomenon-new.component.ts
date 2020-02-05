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
@Component({
  selector: 'senph-phenomenon-new',
  templateUrl: './phenomenon-new.component.html',
  styleUrls: ['./phenomenon-new.component.scss']
})

export class PhenomenonNewComponent implements OnInit {
  languageArray = LANGUAGES;
  domainsArray;
  domainsArrayFiltered;
  unitsArray;
  unitsArrayFiltered;
  heroBannerString = "http://www.opensensemap.org/SENPH#";
  phenomenonForm: FormGroup;
  validationMessages = {
    'uri': {
      'required': 'URI is required.',
      'uriSyntax': 'No white spaces allowed in URI.'
    },
    'label': {
      'required': 'URI is required.'
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
    this.phenomenonForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      //['', [Validators.required]],
      description: ['', [Validators.required]],
      domain: this.fb.array([
        this.addDomainFormGroup()
      ]),
      unit: this.fb.array([
        this.addUnitFormGroup()
      ])
    })

    this.phenomenonForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.phenomenonForm);
      }
    );

    this.retrieveDomains();
    this.retrieveUnits();
  }

  addDomainButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('domain')).push(this.addDomainFormGroup());
  }

  addUnitButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('unit')).push(this.addUnitFormGroup());
  }

  addLabelButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('label')).push(this.addLabelFormGroup());
  }

  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
    // console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // console.log(abstractControl);
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
      domainUri: [''],
      domainLabel: ['']
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: ['', [Validators.required]],
      unitLabel: ['', [Validators.required]]
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }


  removeDomainButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('domain')).removeAt(skillGroupIndex);
  }

  removeUnitButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('unit')).removeAt(skillGroupIndex);
  }

  removeLabelButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('label')).removeAt(skillGroupIndex);
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
    console.log(unitSet);

    unitSet.forEach(s => {
      formArray.push(this.fb.group({
        unitUri: s.unit.value,
        unitLabel: s.unitLabel.value
      }));
    });

    return formArray;
  }

  setExistingLabels(labelSet: IIri[]): FormArray {
    const formArray = new FormArray([]);
    console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: s.label.type,
        value: s.label.value,
        lang: s.label["xml:lang"]
      }));
    });

    return formArray;
  }


  retrieveDomains() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray = res;
      this.domainsArray = this.domainsArray.filter(function (el) {
        return el.domain.type != 'bnode'
      })
      // console.log(this.domainsArray);
      this.domainsArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      console.dir(res);
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      console.log(this.unitsArray);
    });
  }

  // assignCopy() {
  //   this.domainsArrayFiltered = Object.assign([], this.domainsArray);
  // }

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
    const formGroupLabel = this.fb.group([
      new FormControl('value', Validators.required),
      new FormControl('lang', Validators.required),
    ]);

    const formArrayLabel = this.fb.array([
      new FormControl('value', Validators.required),
      new FormControl('lang', Validators.required),
    ]);

    console.log(formArrayDomain);
    console.log(formGroupDomain);
    console.log(formArrayUnit);
    console.log(formGroupUnit);
  }

  onSubmit() {
    console.log(this.phenomenonForm.value);
    // this.api.addPhenomenon(this.phenomenonForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.phenomenonForm);
  }

}


