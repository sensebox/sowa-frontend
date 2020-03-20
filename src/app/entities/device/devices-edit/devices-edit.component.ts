import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { ISensors } from 'src/app/interfaces/ISensors';
import { FormErrors } from 'src/app/interfaces/form-errors';



@Component({
  selector: 'senph-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.scss']
})
export class DevicesEditComponent implements OnInit {

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
    private _routerService: Router
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
    console.log(this.deviceForm.getRawValue());

    if (this.deviceForm.invalid) {
      console.log("invalid");
    }
    else {
      console.log("valid");
      this.api.editDevice(this.deviceForm.getRawValue()).subscribe(
        res => {
          console.log(res)
        },
        (error: any) => console.log(error)
      );
      // this.diagnostic(this.deviceForm);
    }
  }
}


