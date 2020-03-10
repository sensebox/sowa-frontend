import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';

@Component({
  selector: 'senph-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() control: FormControl;
  @Input() id: String;
  @Input() label: String;
  @Input() formErrors;

  tempValue: String;
  checkboxState = false;

  constructor() { }

  ngOnInit() {
  }

  setInitCheckBoxState() {
    if (this.control.value === 'undefined') {
      this.checkboxState = true;
      this.toggleDisabled(
        {
          target: {
            checked: this.checkboxState
          }
        }
      )
    }
  }

  toggleDisabled(e) {
    console.log(e);
    console.log(this.control)
    if (e.target.checked) {
      this.tempValue = this.control.value;
      this.control.disable();
      this.control.setValue('undefined');
    }
    else {
      this.control.enable();
      this.control.setValue(this.tempValue);
    }
    console.log(this.control)
  }
}