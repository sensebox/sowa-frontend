import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsFormComponent } from './domains-form.component';

describe('DomainsFormComponent', () => {
  let component: DomainsFormComponent;
  let fixture: ComponentFixture<DomainsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
