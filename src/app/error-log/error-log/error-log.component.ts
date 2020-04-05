import { Component, OnInit, Input } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'senph-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.scss']
})
export class ErrorLogComponent implements OnInit {

  @Input() errorMessage;

  constructor(private errorService: ErrorModalService, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.errorService.setErrorModalOpen(false);
    this.authService.setLoginPageOpen(true);
  }

}
