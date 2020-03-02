import { Component, OnInit, Input} from '@angular/core';
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
  
  tempValue: String;

  constructor() { }

  ngOnInit() {
  }

  toggleDisabled(e){
    console.log(e);
    if(e.target.checked){
      
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