import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'senph-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }
  devicesArray;
  validationMessages = {
    'device': {
      'required': 'Please select a device.'
    } 
  };

  ngOnInit() {
    this.retrieveDevices();
  }

  get device(): FormArray {
    return this.parentForm.get('device') as FormArray;
  } 

  addDeviceButtonClick(): void {
    (<FormArray>this.parentForm.get('device')).push(this.addDeviceFormGroup());
  }

  addDeviceFormGroup(): FormGroup {
    return this.fb.group({
      device: ['', [Validators.required]]
    });
  }

  getSelectedDevice(id) {
    return this.parentForm.value.device[id].device;
  }

  retrieveDevices() {
    this.api.getDevices().subscribe(res => {
      this.devicesArray = res;
      // this.devicesArray = this.devicesArray.filter(function (el) {
      //   return el.device.type != 'bnode'
      // })
      // console.log(this.devicesArray);
      // this.devicesArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      // console.dir(this.devicesArray);
    });
  }

  removeDeviceButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('device')).removeAt(skillGroupIndex);
  }
}

