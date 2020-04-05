import { TestBed } from '@angular/core/testing';

import { ErrorModalService } from './error-modal.service';

describe('ErrorModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorModalService = TestBed.get(ErrorModalService);
    expect(service).toBeTruthy();
  });
});
