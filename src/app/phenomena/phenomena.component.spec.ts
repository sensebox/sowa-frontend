import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenaComponent } from './phenomena.component';

describe('PhenomenaComponent', () => {
  let component: PhenomenaComponent;
  let fixture: ComponentFixture<PhenomenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
