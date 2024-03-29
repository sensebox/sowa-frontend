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
  deletedSensors = new FormArray([]);

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
      sensor: [null, [Validators.required]],
      exists: [false, [Validators.required]]

    });
  }

  getSelectedSensor(id) {
    return this.parentForm.getRawValue().sensor[id].sensor;
  }

  retrieveSensors() {
    this.api.getSensors().subscribe(res => {
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.sensorsArray = tempArray;
    });
  }

  removeSensorButtonClick(skillGroupIndex: number): void {

    let deletedSensor = (<FormArray>this.parentForm.get('sensor')).at(skillGroupIndex);
    console.log(deletedSensor.value)
    if (deletedSensor.value.exists === true) {
      this.deletedSensors.push(deletedSensor);
      console.log(this.deletedSensors)
      this.parentForm.setControl(
        "deletedSensors",
        this.deletedSensors
      )
    }

    (<FormArray>this.parentForm.get('sensor')).removeAt(skillGroupIndex);
  }
}

