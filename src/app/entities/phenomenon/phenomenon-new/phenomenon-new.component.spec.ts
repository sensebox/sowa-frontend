import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenonNewComponent } from './phenomenon-new.component';

describe('PhenomenonNewComponent', () => {
  let component: PhenomenonNewComponent;
  let fixture: ComponentFixture<PhenomenonNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenonNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenonNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
