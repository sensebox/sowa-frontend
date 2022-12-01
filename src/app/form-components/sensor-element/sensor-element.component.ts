import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'senph-sensor-element',
  templateUrl: './sensor-element.component.html',
  styleUrls: ['./sensor-element.component.scss']
})
export class SensorElementComponent implements OnInit {
  @Input() parentForm: FormGroup;

  tempValue = {
    accVal: 0,
    unit: ""
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  radioButtons: {
    accVal: boolean[],
    unit: boolean[]
  }

  unitsArray;
  phenomenaArray;
  validationMessages = {
    'label': {
      'required': 'Please select a phenomenon.'
    },
    'unitOfAccuracy': {
      'required': 'Please select a unit for the value of accuracy.'
    },
    'accuracyValue': {
      'required': 'Please select a value of accuracy.'
    }
  };
  deletedSensorElements = new FormArray([]);

  ngOnInit() {
    this.retrievePhenomena();
    this.retrieveUnits();
  }
  

  get sensorElement(): FormArray {
    return this.parentForm.get('sensorElement') as FormArray;
  }

  addSensorElementButtonClick(): void {
    (<FormArray>this.parentForm.get('sensorElement')).push(this.addSensorElementFormGroup());
  }

  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      sensorElementId: [null],
      phenomenonId: [null, [Validators.required]],
      unitId: [null, [Validators.required]],
      // unitOfAccuracy: [{ value: null, disabled: false }, [Validators.required]],
      unitUndefined:[false],
      accuracyValue: [{ value: null, disabled: false }, [Validators.required]],
      accValUndefined: [false],
      exists: [false, [Validators.required]]
    });
  }

  getSelectedPhenomenon(id) {
    return this.parentForm.value.sensorElement[id].phenomenonId;
  }

  retrievePhenomena() {
    this.api.getPhenomena().subscribe(res => {
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.phenomenaArray = tempArray;
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.unitsArray = tempArray;
    });
  }

  toggleDisabled(e, dom, i) {
    console.log(e);
    if (e.target.checked) {
      this.tempValue[i] = dom.value;
      dom.disable();
      dom.setValue(null);
    }
    else {
      dom.enable();
      dom.setValue(this.tempValue[i]);
    }
  }


  removeSensorElementButtonClick(skillGroupIndex: number): void {

    let deletedSensorElement = (<FormArray>this.parentForm.get('sensorElement')).at(skillGroupIndex);
    console.log(deletedSensorElement.value)
    if (deletedSensorElement.value.exists === true) {
      this.deletedSensorElements.push(deletedSensorElement);
      console.log(this.deletedSensorElements)
      this.parentForm.setControl(
        "deletedSensorElements",
        this.deletedSensorElements
      )
    }


    (<FormArray>this.parentForm.get('sensorElement')).removeAt(skillGroupIndex);
  }
}
