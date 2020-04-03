import { Component, OnInit } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'senph-error-log-modal',
  templateUrl: './error-log-modal.component.html',
  styleUrls: ['./error-log-modal.component.scss']
})
export class ErrorLogModalComponent implements OnInit {

  constructor(private errorService: ErrorModalService) { }

  errorModalOpen$ = this.errorService.getErrorModalOpen();

  ngOnInit() {
  }

  closeModal(){
    this.errorService.setErrorModalOpen(false);
  }

}
