import { TestBed } from '@angular/core/testing';

import { ValidationServiceService } from './validation-service.service';

describe('ValidationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationServiceService = TestBed.get(ValidationServiceService);
    expect(service).toBeTruthy();
  });
});
