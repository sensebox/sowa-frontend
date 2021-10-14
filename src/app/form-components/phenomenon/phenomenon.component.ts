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
      // phenomenonObject: [{
        phenomenonURI: ['',
        // phenomenonLabel: ''}, 
        [Validators.required]]
    });
  }

  getSelectedPhenomenon(id) {
    return this.parentForm.value.phenomenon[id].phenomenonURI;
  }

  getValueFor(value) {
  }

  retrievePhenomena() {
    this.api.getPhenomenaAllLabels().subscribe(res => {
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        return el.phenomenon.type != 'bnode'
      })
      tempArray.sort((a, b) => a.phenomenonLabel.value.localeCompare(b.phenomenonLabel.value));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
    });
  }

  removePhenomenonButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('phenomenon')).removeAt(skillGroupIndex);
  }
}


