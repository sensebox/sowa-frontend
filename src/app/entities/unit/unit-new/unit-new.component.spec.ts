import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNewComponent } from './unit-new.component';

describe('UnitNewComponent', () => {
  let component: UnitNewComponent;
  let fixture: ComponentFixture<UnitNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
