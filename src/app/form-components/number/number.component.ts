
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

  constructor() { }

  ngOnInit() {
  }

  toggleDisabled(e) {
    if (e.target.checked) {

      this.tempValue = this.control.value;
      this.control.disable();
      this.control.setValue('undefined');
    }
    else {
      this.control.enable();
      this.control.setValue(this.tempValue);
    }
  }
}