import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPhenomenonComponent } from './form-phenomenon.component';

describe('FormPhenomenonComponent', () => {
  let component: FormPhenomenonComponent;
  let fixture: ComponentFixture<FormPhenomenonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPhenomenonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhenomenonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
