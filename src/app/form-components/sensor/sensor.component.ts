import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'senph-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  
  @Input() parentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }
  sensorsArray;
  validationMessages = {
    'sensor': {
      'required': 'Please select a sensor.'
    } 
  };

  ngOnInit() {
    this.retrieveSensors();
  }

  get sensor(): FormArray {
    return this.parentForm.get('sensor') as FormArray;
  } 

  addSensorButtonClick(): void {
    (<FormArray>this.parentForm.get('sensor')).push(this.addSensorFormGroup());
  }

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensorUri: ['', [Validators.required]]
    });
  }

  getSelectedSensor(id) {
    return this.parentForm.value.sensor[id].sensorUri;
  }

  retrieveSensors() {
    this.api.getSensors().subscribe(res => {
      this.sensorsArray = res;
      this.sensorsArray = this.sensorsArray.filter(function (el) {
        return el.sensor.type != 'bnode'
      })
      this.sensorsArray.sort((a, b) => a.sensorLabel[0].value.localeCompare(b.sensorLabel[0].value));

      // console.dir(this.sensorsArray);
    });
  }

  removeSensorButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('sensor')).removeAt(skillGroupIndex);
  }
}

