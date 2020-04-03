import { Component, OnInit } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'senph-error-log-container',
  templateUrl: './error-log-container.component.html',
  styleUrls: ['./error-log-container.component.scss']
})
export class ErrorLogContainerComponent implements OnInit {

  errorMessage$ = this.errorService.getErrorMessage();

  constructor(private errorService: ErrorModalService) { }

  ngOnInit() {
  }
}
