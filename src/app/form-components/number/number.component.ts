
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'senph-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() control: FormControl;
  @Input() id: string;
  @Input() label: string;
  @Input() step: number;
  @Input() placeholder: number;
  @Input() addon: string;
  @Input() formErrors;


  tempValue: number;
  checkboxState = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.control)
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
}