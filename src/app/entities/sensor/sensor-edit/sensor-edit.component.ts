import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';

@Component({
  selector: 'senph-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {

  heroBannerString = "http://www.opensensemap.org/SENPH#";
  sensorForm: FormGroup;

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
      manufacturer: [{value: '', disabled: false}],
      price: [{value: '', disabled: false}],
      datasheet: [{value: '', disabled: false}],
      lifeperiod: [{value: '', disabled: false}],
      image: [{value: '', disabled: false}]
    })

    this.sensorForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.sensorForm);
      }
    );

    this.route.paramMap.subscribe(params => {
      const shortUri = params.get('id');
      if (shortUri) {
        this.getSensor(shortUri);
      }
    });
  }


  logValidationErrors(group: FormGroup = this.sensorForm): void {
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


  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      phenomenonUri: ['', [Validators.required]],
      unitOfAccuracy: ['', [Validators.required]],
      accuracyValue: ['', [Validators.required]]
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


  getSensor(shortUri) {
    this.api.getSensor(shortUri).subscribe(
      (sensor) => this.editSensor(sensor),
      (err: any) => console.log(err)
    );
  }


  editSensor(sensor) {
    console.log(sensor);
    this.sensorForm.patchValue({
      uri: sensor.iri.value.slice(34),
      description: sensor.description.value,
      manufacturer: sensor.manufacturer.value,
      price: sensor.price.value,
      datasheet: sensor.datasheet.value,
      lifeperiod: sensor.lifeperiod ? sensor.lifeperiod.value : '',
      image: sensor.image ? sensor.image.value : '',
    });
    this.sensorForm.setControl('label', this.setExistingLabels(sensor.labels))

    this.sensorForm.setControl('sensorElement', this.setExistingSensorElements(sensor.sensorElements))

    this.sensorForm.setControl('device', this.setExistingDevices(sensor.devices))
  }


  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    // console.log(sensorElementSet);
    sensorElementSet.forEach(s => {
      formArray.push(this.fb.group({
        phenomenonUri: [s.phenomenon.value, [Validators.required]],
        unitOfAccuracy: [s.unit.value, [Validators.required]],
        accuracyValue: [s.accVal.value, [Validators.required]]
      }));
    });

    return formArray;
  }


  setExistingDevices(deviceSet): FormArray {
    const formArray = new FormArray([]);
    // console.log(deviceSet);
    deviceSet.forEach(s => {
      formArray.push(this.fb.group({
        deviceUri: [s.device.value, [Validators.required]]
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


  get image(): FormArray {
    return this.sensorForm.get('image') as FormArray;
  } 


  onSubmit() {
    // console.log(this.devicesArray);
    // this.sensorForm.controls.sensorElement.forEach(element => {
    //   element.accuracyValue.toFixed(10);
    // });
    console.log(this.sensorForm.value);
    // this.api.editSensor(this.sensorForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.sensorForm);
  }
}


