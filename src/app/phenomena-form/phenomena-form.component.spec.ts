import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenaFormComponent } from './phenomena-form.component';

describe('PhenomenaFormComponent', () => {
  let component: PhenomenaFormComponent;
  let fixture: ComponentFixture<PhenomenaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
