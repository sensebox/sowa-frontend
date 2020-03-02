import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service'

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
      phenomenonUri: ['', [Validators.required]]
    });
  }

  getSelectedPhenomenon(id) {
    return this.parentForm.value.phenomenon[id].phenomenonUri;
  }

  retrievePhenomena() {
    this.api.getPhenomena().subscribe(res => {
      this.phenomenaArray = res;
      this.phenomenaArray = this.phenomenaArray.filter(function (el) {
        return el.phenomenon.type != 'bnode'
      })
      // console.log(this.phenomenaArray);
      this.phenomenaArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      // console.dir(this.phenomenaArray);
    });
  }

  removePhenomenonButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('phenomenon')).removeAt(skillGroupIndex);
  }
}


