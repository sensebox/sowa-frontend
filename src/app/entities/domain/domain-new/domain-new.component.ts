import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';
import { FormErrors } from 'src/app/interfaces/form-errors';

@Component({
  selector: 'senph-domain-new',
  templateUrl: './domain-new.component.html',
  styleUrls: ['./domain-new.component.scss']
})
export class DomainNewComponent implements OnInit {

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
  formErrors: FormErrors = {

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
    this.domainForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      phenomenon: this.fb.array([
        this.addPhenomenonFormGroup()
      ]),
      validation: [false, [Validators.required]]
    })

    this.domainForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.domainForm);
      }
    );
  }


  logValidationErrors(group: FormGroup = this.domainForm): void {
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


  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      type: "literal",
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }

  addPhenomenonFormGroup(): FormGroup {
    return this.fb.group({
      // phenomenonObject: [{
      phenomenonURI: ['',
        // phenomenonLabel: ''}, 
        [Validators.required]]
    });
  }

  onLoadButtonClick() {
    console.log(this.domainForm.getRawValue());
  }

  onSubmit() {
    console.log(this.domainForm.value);
    this.submitted = true;
    if (this.domainForm.invalid) {
      console.log("invalid");
    }
    else {
      console.log("valid");
      this.api.createDomain(this.domainForm.value).subscribe(res => {
        console.log(res)
      },
        (error: any) => console.log(error)
      );
    }
  }
}


