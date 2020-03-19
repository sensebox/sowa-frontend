
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'senph-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  user$ = this.authService.getUser();
  errorMessage$ = this.authService.getErrorMessage();
  loading$ = this.authService.getLoading();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(creds){
    this.authService.login(creds);
  }

}
