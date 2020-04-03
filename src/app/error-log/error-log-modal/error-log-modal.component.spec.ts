import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogModalComponent } from './error-log-modal.component';

describe('ErrorLogModalComponent', () => {
  let component: ErrorLogModalComponent;
  let fixture: ComponentFixture<ErrorLogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
