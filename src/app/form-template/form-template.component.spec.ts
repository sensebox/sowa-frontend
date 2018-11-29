import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateComponent } from './form-template.component';

describe('FormTemplateComponent', () => {
  let component: FormTemplateComponent;
  let fixture: ComponentFixture<FormTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
