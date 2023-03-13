import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryVehicleMaintenanceComponent } from './show-history-vehicle-maintenance.component';

describe('ShowHistoryVehicleMaintenanceComponent', () => {
  let component: ShowHistoryVehicleMaintenanceComponent;
  let fixture: ComponentFixture<ShowHistoryVehicleMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHistoryVehicleMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHistoryVehicleMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
