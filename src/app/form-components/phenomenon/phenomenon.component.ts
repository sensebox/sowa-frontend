import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { IPhenomena } from 'src/app/interfaces/IPhenomena';

@Component({
  selector: 'senph-phenomenon',
  templateUrl: './phenomenon.component.html',
  styleUrls: ['./phenomenon.component.scss']
})
export class PhenomenonComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }
  phenomenaArray;
  validationMessages = {
    'phenomenon': {
      'required': 'Please select a phenomenon.'
    }
  };
  deletedPhenomena = new FormArray([]);

  ngOnInit() {
    this.retrievePhenomena();
  }

  get phenomenon(): FormArray {
    return this.parentForm.get('phenomenon') as FormArray;
  }

  addPhenomenonButtonClick(): void {
    (<FormArray>this.parentForm.get('phenomenon')).push(this.addPhenomenonFormGroup());
  }

  addPhenomenonFormGroup(): FormGroup {
    return this.fb.group({
        phenomenon: [null, [Validators.required]],
        exists: [false, [Validators.required]]
    });
  }

  getSelectedPhenomenon(id) {
    return this.parentForm.getRawValue().phenomenon[id].phenomenon;
  }

  getValueFor(value) {
  }

  retrievePhenomena() {
    this.api.getPhenomena().subscribe(res => {
      var tempArray: any = res;

      tempArray.sort((a, b) => a.slug.localeCompare(b.slug));

      this.phenomenaArray = tempArray;
    });
  }

  removePhenomenonButtonClick(skillGroupIndex: number): void {

    let deletedPhenomenon = (<FormArray>this.parentForm.get('phenomenon')).at(skillGroupIndex);
    console.log(deletedPhenomenon.value)
    if (deletedPhenomenon.value.exists === true) {
      this.deletedPhenomena.push(deletedPhenomenon);
      console.log(this.deletedPhenomena)
      this.parentForm.setControl(
        "deletedPhenomena",
        this.deletedPhenomena
      )
    }

    (<FormArray>this.parentForm.get('phenomenon')).removeAt(skillGroupIndex);
  }
}


