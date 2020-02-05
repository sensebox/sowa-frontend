import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { IDomain } from '../../../interfaces/IDomain';
import { IIri } from '../../../interfaces/IIri';
import { IUnit } from '../../../interfaces/IUnit';
import { IPhenomenon } from '../../../interfaces/IPhenomenon';
import { IElements } from '../../../interfaces/IElements';
import { IDevice } from '../../../interfaces/IDevice';
import { LANGUAGES } from '../../../shared/mock-languages';

@Component({
  selector: 'senph-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {
  // heroBannerString = "http://www.opensensemap.org/SENPH#";
  // sensorForm: FormGroup;


  // validationMessages = {
  //   'uri': {
  //     'required': 'URI is required.',
  //     'uriSyntax': 'No white spaces allowed in URI.'
  //   },
  //   'label': {
  //     'required': 'Label is required.'
  //   },
  //   'description': {
  //     'required': 'Description is required.'
  //   }
  // };

  // formErrors = {
  // };

  // constructor(
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private api: ApiService,
  //   private _routerService: Router
  // ) { }

  // ngOnInit() {
  //   this.sensorForm = this.fb.group({
  //     uri: ['', [Validators.required, CustomValidators.uriSyntax]],
  //     label: this.fb.array([
  //       this.addLabelFormGroup()
  //     ]),
  //     //['', [Validators.required]],
  //     description: ['', [Validators.required]],
  //     sensorElement: this.fb.array([
  //       this.addSensorElementFormGroup()
  //     ]),
  //     device: this.fb.array([
  //       this.addDeviceFormGroup()
  //     ])
  //   })

  //   this.sensorForm.valueChanges.subscribe(
  //     (data) => {
  //       this.logValidationErrors(this.sensorForm);
  //     }
  //   );

  //   this.route.paramMap.subscribe(params => {
  //     const shortUri = params.get('id');
  //     if (shortUri) {
  //       this.getSensor(shortUri);
  //     }
  //   });

  //   this.retrieveSensorElements();
  //   this.retrieveDevices();

  //   // this.getSensorDetails();
  // }

  // addSensorElementButtonClick(): void {
  //   (<FormArray>this.sensorForm.get('sensorElement')).push(this.addSensorElementFormGroup());
  // }

  // addDeviceButtonClick(): void {
  //   (<FormArray>this.sensorForm.get('device')).push(this.addDeviceFormGroup());
  // }

  // addLabelButtonClick(): void {
  //   (<FormArray>this.sensorForm.get('label')).push(this.addLabelFormGroup());
  // }

  // logValidationErrors(group: FormGroup = this.sensorForm): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrors(abstractControl);
  //     }
  //     else {
  //       this.formErrors[key] = '';
  //       if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
  //         const messages = this.validationMessages[key];
  //         for (const errorKey in abstractControl.errors) {
  //           if (errorKey) {
  //             this.formErrors[key] += messages[errorKey] + ' ';
  //           }
  //         }
  //       }
  //     }
  //   });
  // }


  // onLoadButtonClick() {
  //   const formGroupDomain = this.fb.group([
  //     new FormControl('domainUri', Validators.required),
  //     new FormControl('domainLabel', Validators.required),
  //   ]);

  //   const formArrayDomain = this.fb.array([
  //     new FormControl('domainUri', Validators.required),
  //     new FormControl('domainLabel', Validators.required),
  //   ]);
  //   const formGroupUnit = this.fb.group([
  //     new FormControl('unitUri', Validators.required),
  //     new FormControl('unitLabel', Validators.required),
  //   ]);

  //   const formArrayUnit = this.fb.array([
  //     new FormControl('unitUri', Validators.required),
  //     new FormControl('unitLabel', Validators.required),
  //   ]);
  //   const formGroupLabel = this.fb.group([
  //     new FormControl('value', Validators.required),
  //     new FormControl('lang', Validators.required),
  //   ]);

  //   const formArrayLabel = this.fb.array([
  //     new FormControl('value', Validators.required),
  //     new FormControl('lang', Validators.required),
  //   ]);

  //   console.log(formArrayDomain);
  //   console.log(formGroupDomain);
  //   console.log(formArrayUnit);
  //   console.log(formGroupUnit);
  // }

  // onSubmit() {
  //   console.log(this.phenomenonForm.value);
  //   // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
  //   // this.diagnostic(this.phenomenonForm);
  // }
  //-------------------------------------------------------

  languageArray = LANGUAGES;
  heroBannerString = "http://www.opensensemap.org/SENPH#";
  sensorForm: FormGroup;
  sensorElementsArray;
  sensorElementsArrayFiltered;
  devicesArray;
  devicesArrayFiltered;

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.sensorForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      labels: this.fb.array([
        this.addLabelFormGroup()
      ]),
      //['', [Validators.required]],
      description: ['', [Validators.required]],
      sensorElements: this.fb.array([
        this.addSensorElementFormGroup()
      ]),
      devices: this.fb.array([
        this.addDeviceFormGroup()
      ]),
      manufacturer: [''],
      price: [''],
      datasheet: [''],
      lifeperiod: [''],
      image: ['']
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

    // this.retrieveSensorElements();
    // this.retrieveDevices();

  }

  addSensorElementButtonClick(): void {
    (<FormArray>this.sensorForm.get('sensorElement')).push(this.addSensorElementFormGroup());
  }

  addDeviceButtonClick(): void {
    (<FormArray>this.sensorForm.get('device')).push(this.addDeviceFormGroup());
  }

  addLabelButtonClick(): void {
    (<FormArray>this.sensorForm.get('label')).push(this.addLabelFormGroup());
  }

  logValidationErrors(group: FormGroup = this.sensorForm): void {
    // console.log(Object.keys(group.controls));
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


  removeSensorElementButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.sensorForm.get('sensorElement')).removeAt(skillGroupIndex);
  }

  removeDeviceButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.sensorForm.get('device')).removeAt(skillGroupIndex);
  }

  removeLabelButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.sensorForm.get('label')).removeAt(skillGroupIndex);
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
      // uri: sensor.iri[0] ? sensor.iri[0].value.slice(34) : "",
      uri: sensor.iri.value.slice(34),
      // description: sensor.description[0] ? sensor.description[0].value : ""
      description: sensor.description.value,
      manufacturer: sensor.manufacturer.value,
      price: sensor.price.value,
      datasheet: sensor.datasheet.value,
      lifeperiod: sensor.lifeperiod? sensor.lifeperiod.value : '',
      image: sensor.image? sensor.image.value : '',
    });
    this.sensorForm.setControl('labels', this.setExistingLabels(sensor.labels))

    this.sensorForm.setControl('sensorElements', this.setExistingSensorElements(sensor.sensorElements))

    this.sensorForm.setControl('devices', this.setExistingDevices(sensor.devices))
  }

  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    console.log(sensorElementSet);
    sensorElementSet.forEach(s => {
      formArray.push(this.fb.group({
        phenomenonUri: s.phenomenon.value,
        unitOfAccuracy: s.unit.value,
        accuracyValue: s.accVal.value
      }));
    });

    return formArray;
  }

  setExistingDevices(deviceSet): FormArray {
    const formArray = new FormArray([]);
    console.log(deviceSet);
    deviceSet.forEach(s => {
      formArray.push(this.fb.group({
        deviceUri: s.value,
      }));
    });

    return formArray;
  }

  setExistingLabels(labelSet): FormArray {
    const formArray = new FormArray([]);
    console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: s.type,
        value: s.value,
        lang: s["xml:lang"]
      }));
    });

    return formArray;
  }

  check() {
    console.log(this.sensorForm.get('devices'));
  }

  onLoadButtonClick() {
    const formGroupSensorElement = this.fb.group([
      new FormControl('phenomenonUri', Validators.required),
      new FormControl('unitOfAccuracy', Validators.required),
      new FormControl('accuracyValue', Validators.required),
    ]);

    const formArraySensorElement = this.fb.array([
      new FormControl('phenomenonUri', Validators.required),
      new FormControl('unitOfAccuracy', Validators.required),
      new FormControl('accuracyValue', Validators.required),
    ]);
    const formGroupDevice = this.fb.group([
      new FormControl('deviceUri', Validators.required),
    ]);

    const formArrayDevice = this.fb.array([
      new FormControl('deviceUri', Validators.required),
    ]);
    const formGroupLabel = this.fb.group([
      new FormControl('value', Validators.required),
      new FormControl('lang', Validators.required),
    ]);

    const formArrayLabel = this.fb.array([
      new FormControl('value', Validators.required),
      new FormControl('lang', Validators.required),
    ]);

    console.log(formArraySensorElement);
    console.log(formGroupSensorElement);
    console.log(formArrayDevice);
    console.log(formGroupDevice);
    console.log(formArrayLabel);
    console.log(formGroupDevice);
  }

  onSubmit() {
    console.log(this.sensorForm.value);
    // this.api.editSensor(this.sensorForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.sensorForm);
  }
}


