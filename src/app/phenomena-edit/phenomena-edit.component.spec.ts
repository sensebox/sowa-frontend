import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenaEditComponent } from './phenomena-edit.component';

describe('PhenomenaEditComponent', () => {
  let component: PhenomenaEditComponent;
  let fixture: ComponentFixture<PhenomenaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
