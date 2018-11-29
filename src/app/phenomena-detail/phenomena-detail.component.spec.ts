import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenaDetailComponent } from './phenomena-detail.component';

describe('PhenomenaDetailComponent', () => {
  let component: PhenomenaDetailComponent;
  let fixture: ComponentFixture<PhenomenaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
