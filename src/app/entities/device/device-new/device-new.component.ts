import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { ISensors } from 'src/app/interfaces/ISensors';
import { FormErrors } from 'src/app/interfaces/form-errors';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import * as bulmaToast from "bulma-toast";

@Component({
  selector: 'senph-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.scss']
})
export class DeviceNewComponent implements OnInit {
  heroBannerString = "http://www.opensensemap.org/SENPH#";
  deviceForm: FormGroup;

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
    },
    'website': {
      'required': 'Provide a datasheet link or use the checkbox to set its value to undefined.',
      'uriSyntax': 'No white spaces allowed in Datasheet-URL.'
    },
    'contact': {
      'required': 'Provide a lifeperiod or use the checkbox to set its value to undefined.'
    },
    'image': {
      'required': 'Provide an image link or use the checkbox to set its value to undefined.',
      'uriSyntax': 'No white spaces allowed in Image-URL.'
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
    this.deviceForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      website: [{ value: '', disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      image: [{ value: '', disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      contact: [{ value: '', disabled: false }, [Validators.required]],
      sensor: this.fb.array([
        this.addSensorFormGroup()
      ]),
      validation: [false, [Validators.required]]
    })

    this.deviceForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.deviceForm);
      }
    );
  }


  logValidationErrors(group: FormGroup = this.deviceForm): void {
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

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensorUri: ['', [Validators.required]]
    });
  }

  onLoadButtonClick() {
    console.log(this.deviceForm.getRawValue());
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.deviceForm.getRawValue());

    if (this.deviceForm.invalid) {
      console.log("invalid");
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
      console.log("valid");
      this.api.createDevice(this.deviceForm.getRawValue()).subscribe(
        res => {
          console.log(res)
          this.deviceForm.reset();
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000
          });
          this._routerService.navigate(['/devices']);

        },
        (error: any) => {
          console.log(error);
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }
}




