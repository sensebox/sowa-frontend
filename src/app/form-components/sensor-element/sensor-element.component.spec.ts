import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorElementComponent } from './sensor-element.component';

describe('SensorElementComponent', () => {
  let component: SensorElementComponent;
  let fixture: ComponentFixture<SensorElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
