import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorizationReportTypeAComponent } from './valorization-report-type-a.component';

describe('ValorizationReportTypeAComponent', () => {
  let component: ValorizationReportTypeAComponent;
  let fixture: ComponentFixture<ValorizationReportTypeAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorizationReportTypeAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorizationReportTypeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
