import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../../phenomenon';
import { ApiService } from '../../../services/api.service'
import { ISensors } from '../../../interfaces/ISensors';


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
    'name': {
      'required': 'URI is required.'
    },
    'description': {
      'required': 'Description is required.'
    },
    'website': {
      'required': 'website is required.'
    },
    'image': {
      'required': 'image is required.'
    },
    'contact': {
      'required': 'contact is required.'
    }
  };

  formErrors = {
    // 'uri': '',
    // 'name': '',
    // 'description': '',
    // 'website': '',
    // 'image': '',
    // 'contact': '',
    // 'sensorUri': '',
    // 'phenomenon': ''
  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.deviceForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      website: ['', [Validators.required]],
      image: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      sensor: this.fb.array([
        this.addSensorFormGroup()
      ])
      // sensor: this.fb.group({
      //   sensorUri: ['', [Validators.required]],
      //   phenomenon: ['', [Validators.required]]
      // })
    })

    this.deviceForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.deviceForm);
      }
    );

  }

  addSensorButtonClick(): void {
    (<FormArray>this.deviceForm.get('sensor')).push(this.addSensorFormGroup());
  }

  logValidationErrors(group: FormGroup = this.deviceForm): void {
    // console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // else if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control)
      //     }
      //   }
      // }

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

  onLoadButtonClick() {
    // this.deviceForm.patchValue({
    //   uri: "senseBox",
    //   name: "senseBox",
    //   description: "A DIY kit to build an environmental monitoring station.",
    //   website: "www.sensebox.de",
    //   image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjCosjcu-biAhXLJFAKHWe1CEIQjRx6BAgBEAU&url=https%3A%2F%2Fsensebox.de%2F&psig=AOvVaw1FMe0n1pkfzfow3lo3uqOP&ust=1560515579903367",
    //   contact: "Reedu GmbH",
    //   sensor: {
    //     sensorUri: "HDC1080",
    //     phenomenon: "temperature"
    //   }
    // });
    // this.logValidationErrors(this.deviceForm);
    // console.log(this.formErrors);
    const formGroup = this.fb.group([
      new FormControl('sensorUri', Validators.required),
      new FormControl('sensorLabel', Validators.required),
    ]);

    const formArray = this.fb.array([
      new FormControl('sensorUri', Validators.required),
      new FormControl('sensorLabel', Validators.required),
    ]);

    console.log(formArray);
    console.log(formGroup);
  }

  onSubmit() {
    console.log(this.deviceForm.value);
    this.api.addDevice(this.deviceForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.deviceForm);
  }

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensorUri: ['', [Validators.required]],
      sensorLabel: ['', [Validators.required]]
    });
  }

  removeSensorButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.deviceForm.get('sensor')).removeAt(skillGroupIndex);
  }



  setExistingSensors(sensorSet: ISensors[]): FormArray {
    const formArray = new FormArray([]);
    sensorSet.forEach(s => {
      formArray.push(this.fb.group({
        sensorUri: s.sensor.value,
        sensorLabel: s.sensorLabel.value
      }));
    });

    return formArray;
  }

}


