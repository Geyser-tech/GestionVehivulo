import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportControlFuelSuppliesComponent } from './report-control-fuel-supplies.component';

describe('ReportControlFuelSuppliesComponent', () => {
  let component: ReportControlFuelSuppliesComponent;
  let fixture: ComponentFixture<ReportControlFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportControlFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportControlFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
