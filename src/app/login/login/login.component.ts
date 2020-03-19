import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'senph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Input() user;
  @Input() errorMessage;
  @Input() loading;
  @Output() loggedIn = new EventEmitter();

  formErrors = {};
  loginForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login(){
    if(this.loginForm.valid)
      this.loggedIn.emit(this.loginForm.getRawValue());
  }

}
