import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsDetailComponent } from './sensors-detail.component';

describe('SensorsDetailComponent', () => {
  let component: SensorsDetailComponent;
  let fixture: ComponentFixture<SensorsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
