import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesEditComponent } from './devices-edit.component';

describe('DevicesEditComponent', () => {
  let component: DevicesEditComponent;
  let fixture: ComponentFixture<DevicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
