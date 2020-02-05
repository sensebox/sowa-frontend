import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainNewComponent } from './domain-new.component';

describe('DomainNewComponent', () => {
  let component: DomainNewComponent;
  let fixture: ComponentFixture<DomainNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
