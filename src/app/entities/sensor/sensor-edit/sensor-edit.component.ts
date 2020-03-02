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
import { ILabel } from 'src/app/interfaces/ILabel';

@Component({
  selector: 'senph-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {

  languageArray = LANGUAGES;
  heroBannerString = "http://www.opensensemap.org/SENPH#";
  sensorForm: FormGroup;
  // phenomenaArray;
  // devicesArray;
  // unitsArray;


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

  information = {
    manufacturer: false,       
    price: false,    
    datasheet: false,
    lifeperiod: false,
    image: false
  }

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
      //['', [Validators.required]],
      description: ['', [Validators.required]],
      sensorElement: this.fb.array([
        this.addSensorElementFormGroup()
      ]),
      device: this.fb.array([
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


    // this.retrievePhenomena();
    // this.retrieveDevices();
    // this.retrieveUnits();


  }



  // addDeviceButtonClick(): void {
  //   (<FormArray>this.sensorForm.get('device')).push(this.addDeviceFormGroup());
  // }

  // addLabelButtonClick(): void {
  //   (<FormArray>this.sensorForm.get('label')).push(this.addLabelFormGroup());
  // }

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




  // removeDeviceButtonClick(skillGroupIndex: number): void {
  //   (<FormArray>this.sensorForm.get('device')).removeAt(skillGroupIndex);
  // }

  // removeLabelButtonClick(skillGroupIndex: number): void {
  //   (<FormArray>this.sensorForm.get('label')).removeAt(skillGroupIndex);
  // }

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
      lifeperiod: sensor.lifeperiod ? sensor.lifeperiod.value : '',
      image: sensor.image ? sensor.image.value : '',
    });
    this.sensorForm.setControl('label', this.setExistingLabels(sensor.labels))

    this.sensorForm.setControl('sensorElement', this.setExistingSensorElements(sensor.sensorElements))

    this.sensorForm.setControl('device', this.setExistingDevices(sensor.devices))
  }

  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    console.log(sensorElementSet);
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
    console.log(deviceSet);
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

  // retrieveDevices() {
  //   this.api.getDevices().subscribe(res => {
  //     this.devicesArray = res;
  //     this.devicesArray = this.devicesArray.filter(function (el) {
  //       return el.device.type != 'bnode'
  //     })
  //     // console.log(this.devicesArray);
  //     this.devicesArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

  //     console.dir(this.devicesArray);
  //   });
  // }

  // retrieveUnits() {
  //   this.api.getUnits().subscribe(res => {
  //     this.unitsArray = res;
  //     // console.log(this.unitsArray);
  //     this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
  //     console.log(this.unitsArray);
  //   });
  // }

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

  // getSelectedDevice(id) {
  //   return this.sensorForm.value.device[id].deviceUri;
  // }
  
  toggleDisabled(control, status, event){
    console.log(control);
    console.log(status);
    console.log(event);
    this.information[status] = event;
    if(event){
      control.setValue('')
    }
    else{
      control.setValue('undefined')
    }
  }
  // toggleDisabled(control) {
  //   console.log(this.information);
  //   if (control.disabled) {
  //     control.setValue('');
  //   }
  //   else {
  //     control.setValue('undefined');
  //   }
  // }

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


