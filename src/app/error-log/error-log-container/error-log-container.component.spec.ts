import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogContainerComponent } from './error-log-container.component';

describe('ErrorLogContainerComponent', () => {
  let component: ErrorLogContainerComponent;
  let fixture: ComponentFixture<ErrorLogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLogContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
