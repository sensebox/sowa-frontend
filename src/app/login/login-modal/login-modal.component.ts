import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'senph-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginPageOpen$ = this.authService.getLoginPageOpen();

  ngOnInit() {
  }

  closeModal(){
    this.authService.setLoginPageOpen(false);
  }
}
