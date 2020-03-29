import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { IPhenomena } from 'src/app/interfaces/IPhenomena';


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
      phenomenonUri: ['', [Validators.required]],
      unitOfAccuracy: [{ value: '', disabled: false }, [Validators.required]],
      unitUndefined:[false],
      accuracyValue: [{ value: '', disabled: false }, [Validators.required]],
      accValUndefined: [false],
    });
  }

  getSelectedPhenomenon(id) {
    return this.parentForm.value.sensorElement[id].phenomenonUri;
  }

  retrievePhenomena() {
    this.api.getPhenomena().subscribe(res => {
      // console.log(res);
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        return el.phenomenon.type != 'bnode'
      })
      // console.log(tempArray);
      tempArray.sort((a, b) => a.phenomenonLabel[0].value.localeCompare(b.phenomenonLabel[0].value));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
      // console.log(this.phenomenaArray);
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      // console.log(this.unitsArray);
    });
  }

  toggleDisabled(e, dom, i) {
    console.log(e);
    if (e.target.checked) {
      // this.tempValue[i] = dom.value;
      dom.disable();
      dom.setValue('undefined');
    }
    else {
      dom.enable();
      dom.setValue('');
    }
  }


  removeSensorElementButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('sensorElement')).removeAt(skillGroupIndex);
  }
}
