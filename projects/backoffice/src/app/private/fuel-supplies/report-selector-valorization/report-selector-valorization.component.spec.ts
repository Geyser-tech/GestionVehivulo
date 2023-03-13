import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSelectorValorizationComponent } from './report-selector-valorization.component';

describe('ReportSelectorValorizationComponent', () => {
  let component: ReportSelectorValorizationComponent;
  let fixture: ComponentFixture<ReportSelectorValorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSelectorValorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSelectorValorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
