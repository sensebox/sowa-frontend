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
  @Input() id: string;
  @Input() label: string;
  @Input() formErrors;

  tempValue: string;
  checkboxState = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      if (this.control.value === null) {
        this.checkboxState = true;
        this.toggleDisabled(
          {
            target: {
              checked: this.checkboxState
            }
          }
        )
      }
    }, 100)
    // console.log(this.control)
  }


  toggleDisabled(e) {
    if (e.target.checked) {
      this.tempValue = this.control.value;
      this.control.disable();
      this.control.setValue(null);
    }
    else {
      this.control.enable();
      this.control.setValue(this.tempValue);
    }
  }

  setInitCheckBoxState() {
    // console.log(this.control.value)
    if (this.control.value === "") {
      this.control.setValue(null);
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


}