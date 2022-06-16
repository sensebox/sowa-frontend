import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsDetailComponent } from './units-detail.component';

describe('UnitsDetailComponent', () => {
  let component: UnitsDetailComponent;
  let fixture: ComponentFixture<UnitsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
