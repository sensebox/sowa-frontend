import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { FormErrors } from 'src/app/interfaces/form-errors';
import { ErrorModalService } from './../../../services/error-modal.service';
import * as bulmaToast from "bulma-toast";
import { environment } from 'src/environments/environment';

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'senph-sensor-new',
  templateUrl: './sensor-new.component.html',
  styleUrls: ['./sensor-new.component.scss']
})
export class SensorNewComponent implements OnInit {

  heroBannerString = "http://www.opensensemap.org/SENPH#";
  sensorForm: FormGroup;
  submitted = false;
  shortUri: string;

  APIURL = environment.api_url;

  public uploader: FileUploader = new FileUploader({
    url: this.APIURL + '/image/upload',
    itemAlias: 'image',
    additionalParameter: {
      sensorUri: ""
    }
  })

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
    'manufacturer': {
      'required': 'Type a manufacturer or use the checkbox to set its value to undefined.'
    },
    'price': {
      'required': 'Provide a price or use the checkbox to set its value to undefined.'
    },
    'datasheet': {
      'required': 'Provide a datasheet link or use the checkbox to set its value to undefined.',
      'uriSyntax': 'No white spaces allowed in Datasheet-URL.'
    },
    'lifeperiod': {
      'required': 'Provide a lifeperiod or use the checkbox to set its value to undefined.'
    },
    'image': {
      'required': 'Provide an image link or use the checkbox to set its value to undefined.',
      'uriSyntax': 'No white spaces allowed in Image-URL.'
    }
  };

  formErrors: FormErrors = {

  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService
  ) { }


  ngOnInit() {
    this.sensorForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      description: ['', [Validators.required]],
      sensorElement: this.fb.array([
        this.addSensorElementFormGroup()
      ]),
      device: this.fb.array([
        this.addDeviceFormGroup()
      ]),
      manufacturer: [{ value: '', disabled: false }, [Validators.required]],
      price: [{ value: '', disabled: false }, [Validators.required]],
      datasheet: [{ value: '', disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      lifeperiod: [{ value: '', disabled: false }, [Validators.required]],
      image: [{ value: '', disabled: false }, [CustomValidators.uriSyntax]],
      validation: [false, [Validators.required]]
    })

    this.sensorForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.sensorForm);
      }
    );

    this.uploader.onAfterAddingFile = (file) => {
      console.log(file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }


  logValidationErrors(group: FormGroup = this.sensorForm): void {
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
              //this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      phenomenonUri: ['', [Validators.required]],
      unitOfAccuracy: [{ value: '', disabled: false }, [Validators.required]],
      unitUndefined: [false],
      accuracyValue: [{ value: '', disabled: false }, [Validators.required]],
      accValUndefined: [false],
    });
  }


  addDeviceFormGroup(): FormGroup {
    return this.fb.group({
      deviceUri: ['', [Validators.required]]
    });
  }


  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }

  get image(): FormArray {
    return this.sensorForm.get('image') as FormArray;
  }

  redirectDetails(uri) {
    this._routerService.navigate(['/sensor/detail', uri]);
  }

  onLoadButtonClick() {
    console.log(this.sensorForm.value);
    console.log(this.sensorForm.getRawValue());
  }

  onSubmit() {
    this.submitted = true;
    
    this.uploader.setOptions({
      additionalParameter: {
        sensorUri: this.sensorForm.get('uri').value
      }
    })
    // console.log(this.devicesArray);
    // this.sensorForm.controls.sensorElement.forEach(element => {
    //   element.accuracyValue.toFixed(10);
    // });  
    var inputValue = (<HTMLInputElement>document.getElementById('imageUpload')).value;
    var extension = inputValue.split('.')[1];
    this.sensorForm.value.image = extension;
    var imageFileName = this.sensorForm.get('uri').value + "." + extension;
    this.sensorForm.get("image").setValue(imageFileName, { emitEvent: false });

    if (this.sensorForm.invalid) {
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
      //this.uploader.uploadAll();
    }
    else {
      console.log("valid");
      this.api.createSensor(this.sensorForm.getRawValue()).subscribe(
        (data) => {
          console.log(data);
          this.sensorForm.reset();
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000
          });
          this.uploader.uploadAll();
          this._routerService.navigate(['/sensors'])
          .then(() => {
            window.location.reload();
          });
        },
        (error: any) => {
          console.log(error);
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
    // this.diagnostic(this.sensorForm);
  }
}


