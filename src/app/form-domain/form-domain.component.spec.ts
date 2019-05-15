import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDomainComponent } from './form-domain.component';

describe('FormDomainComponent', () => {
  let component: FormDomainComponent;
  let fixture: ComponentFixture<FormDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
