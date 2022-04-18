import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'
@Component({
  selector: 'senph-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  unitsArray;
  validationMessages = {
    'unit': {
      'required': 'Please select a unit.'
    }
  };
  deletedUnits = new FormArray([]);

  ngOnInit() {
    this.retrieveUnits();
  }

  get unit(): FormArray {
    return this.parentForm.get('unit') as FormArray;
  } 

  addUnitButtonClick(): void {
    (<FormArray>this.parentForm.get('unit')).push(this.addUnitFormGroup());
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: [null, [Validators.required]],
      min: null,
      max: null,
      rovId: null
    });
  }


  getSelectedUnit(id) {
    return this.parentForm.value.unit[id].unitUri;
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      // this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      // console.log(this.unitsArray);
    });
  }

  removeUnitButtonClick(skillGroupIndex: number): void {

    let deletedUnit = (<FormArray>this.parentForm.get('unit')).at(skillGroupIndex);
    // console.log(deletedUnit.value.rovId)
    if (deletedUnit.value.rovId !== null) {
      this.deletedUnits.push(deletedUnit);
      console.log(this.deletedUnits)
      this.parentForm.setControl(
        "deletedUnits",
        this.deletedUnits
      )
    }

    (<FormArray>this.parentForm.get('unit')).removeAt(skillGroupIndex);
  }
}
