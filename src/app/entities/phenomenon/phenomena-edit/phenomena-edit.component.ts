import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { IDomains } from '../../../interfaces/IDomains';
import { IUnit } from '../../../interfaces/IUnit';
import { ILabel } from 'src/app/interfaces/ILabel';
import { FormErrors } from 'src/app/interfaces/form-errors';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import * as bulmaToast from "bulma-toast";

@Component({
  selector: 'senph-phenomena-edit',
  templateUrl: './phenomena-edit.component.html',
  styleUrls: ['./phenomena-edit.component.scss']
})
export class PhenomenaEditComponent implements OnInit {
  heroBannerString = "http://sensors.wiki/SENPH#";
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

  formErrors: FormErrors = {
  };
  shortUri: string;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService
  ) { }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      markdown: [''],
      domain: this.fb.array([
        this.addDomainFormGroup()
      ]),
      unit: this.fb.array([
        this.addUnitFormGroup()
      ]),
      validation: [false, [Validators.required]]
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
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' || this.submitted)) {
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
      unitUri: ['', [Validators.required]],
      min: ['', [Validators.required]],
      max: ['', [Validators.required]]
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
      uri: phenomenon.iri.value.slice(this.heroBannerString.length),
      description: phenomenon.description ? phenomenon.description.value : '',
      markdown: phenomenon.markdown ? phenomenon.markdown.value : '',
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
        unitUri: [s.unit.value, [Validators.required]],
        min: [s.min.value, []],
        max: [s.max.value, []]
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

  redirectDetails(uri) {
    this._routerService.navigate(['/phenomenon/detail', uri]);
  }

  onLoadButtonClick() {
  }

  onSubmit() {
    this.submitted = true;


    if (this.phenomenonForm.invalid) {
      bulmaToast.toast({
        message: "Some necessary information is missing! Please check your form.",
        type: "is-danger",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "center",
        pauseOnHover: true,
        duration: 5000
      });
    }
    else {
      this.api.editPhenomenon(this.phenomenonForm.value).subscribe(
        (res) => {
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000
          });
          this.redirectDetails(this.shortUri);
        },
        (error: any) => {
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
    // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
    // this.diagnostic(this.phenomenonForm);
  }

  onDelete() {
    this.api.deletePhenomenon(this.phenomenonForm.getRawValue()).subscribe(
      (data) => {
        bulmaToast.toast({
          message: "Delete successful!",
          type: "is-success",
          dismissible: true,
          closeOnClick: true,
          animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
          position: "top-center",
          duration: 5000
        });
        this._routerService.navigate(['/phenomena']);
      },
      (error: any) => {
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }

}


