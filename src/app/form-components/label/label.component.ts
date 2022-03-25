import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { LANGUAGES } from '../../shared/mock-languages';

@Component({
  selector: 'senph-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {


  @Input() parentForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  languageArray = LANGUAGES;
  validationMessages = {
    'label': {
      'required': 'Label is required.'
    }, 
    'labelLang': {
      'required': 'Language for label is required.'
    }
  };
  deletedLabels = new FormArray([]);
  
  ngOnInit() {
  }

  get label(): FormArray {
    return this.parentForm.get('label') as FormArray;
  } 

  addLabelButtonClick(): void {
    (<FormArray>this.parentForm.get('label')).push(this.addLabelFormGroup());
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      translationId: null,
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }

  removeLabelButtonClick(skillGroupIndex: number): void {
    console.log(skillGroupIndex);

    // console.log((<FormArray>this.parentForm.get('deletedLabels')).value);
    let deletedLabel = (<FormArray>this.parentForm.get('label')).at(skillGroupIndex);
    console.log(deletedLabel.value.translationId)
    if (deletedLabel.value.translationId !== null) {
      this.deletedLabels.push(deletedLabel);
      console.log(this.deletedLabels)
      this.parentForm.setControl(
        "deletedLabels",
        this.deletedLabels
      )
    }
    // (<FormArray>this.parentForm.get('deletedLabels')).push(deletedLabel);
    console.log((<FormArray>this.parentForm.get('deletedLabels')).value);

    console.log((<FormArray>this.parentForm.get('label')).at(skillGroupIndex).value);    
    (<FormArray>this.parentForm.get('label')).removeAt(skillGroupIndex);
    // console.log((<FormArray>this.parentForm.get('label')).at(skillGroupIndex).value);
  }

}