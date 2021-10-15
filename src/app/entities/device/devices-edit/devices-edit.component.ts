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

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'senph-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.scss']
})
export class DevicesEditComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/image/upload',
    itemAlias: 'image',
    authToken : window.localStorage.getItem('sb_accesstoken'),
    additionalParameter: {
      uri: ""
    }
  })

  currentFile = null;

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

    this.uploader.onAfterAddingFile = (file) => {
      console.log(file);
      file.withCredentials = false;
      this.currentFile = file.file.name;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      bulmaToast.toast({
        message: "Image successfully uploaded!",
        type: "is-success",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "top-center",
        duration: 5000,
      });
      this.redirectDetails(this.shortUri);
    };

    this.route.paramMap.subscribe(params => {
      this.shortUri = params.get('id');
      if (this.shortUri) {
        this.getDevice(this.shortUri);
      }
    });
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

  getDevice(shortUri) {
    this.api.getDevice(shortUri).subscribe(
      (device) => this.editDevice(device),
      (err: any) => console.log(err)
    );
  }

  editDevice(device) {
    console.log(device);
    this.deviceForm.patchValue({
      uri: device.iri.value.slice(34),
      description: device.description.value,
      website: device.website ? device.website.value : '',
      image: device.image ? device.image.value : '',
      contact: device.contact ? device.contact.value : '',
    });

    this.deviceForm.setControl('label', this.setExistingLabels(device.labels))

    this.deviceForm.setControl('sensor', this.setExistingSensors(device.sensors))
  }

  setExistingSensors(sensorSet: ISensors[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(sensorSet);
    sensorSet.forEach(s => {
      formArray.push(this.fb.group({
        sensorUri: [s.sensor.value, [Validators.required]]
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

  redirectDetails(uri) {
    this._routerService.navigate(['/device/detail', uri]);
  }

  onLoadButtonClick() {
    console.log(this.deviceForm.getRawValue());
  }

  onSubmit() {
    this.submitted = true;

    this.uploader.setOptions({
      additionalParameter: {
        uri: this.deviceForm.get('uri').value
      }
    })

    var inputValue = (<HTMLInputElement>document.getElementById('imageUpload')).value;
    var extension = inputValue.split('.')[1];
    this.deviceForm.value.image = extension;
    var imageFileName = this.deviceForm.get('uri').value + "." + extension;
    this.deviceForm.get("image").setValue(imageFileName, { emitEvent: false });

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
      this.api.editDevice(this.deviceForm.getRawValue()).subscribe(
        res => {
          console.log(res);
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000
          });
          if(this.uploader.queue.length == 1) {
            this.uploader.uploadAll()
          } else {this.redirectDetails(this.shortUri);}
        },
        (error: any) => {
          console.log(error)
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }

  onDelete() {
    this.api.deleteDevice(this.deviceForm.getRawValue()).subscribe(
      (data) => {
        console.log(data);
        bulmaToast.toast({
          message: "Delete successful!",
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
        console.log(error)
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }
}


