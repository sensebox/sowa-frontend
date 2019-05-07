import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSensorComponent } from './form-sensor.component';

describe('FormSensorComponent', () => {
  let component: FormSensorComponent;
  let fixture: ComponentFixture<FormSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
