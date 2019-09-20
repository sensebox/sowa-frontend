import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainEditComponent } from './domain-edit.component';

describe('DomainEditComponent', () => {
  let component: DomainEditComponent;
  let fixture: ComponentFixture<DomainEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
