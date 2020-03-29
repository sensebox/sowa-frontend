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
      type: "literal",
      value: ['', [Validators.required]],
      lang: ['', [Validators.required]]
    });
  }

  removeLabelButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('label')).removeAt(skillGroupIndex);
  }

}