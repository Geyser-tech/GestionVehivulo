import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryVehicleInspectionsComponent } from './show-history-vehicle-inspections.component';

describe('ShowHistoryVehicleInspectionsComponent', () => {
  let component: ShowHistoryVehicleInspectionsComponent;
  let fixture: ComponentFixture<ShowHistoryVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHistoryVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHistoryVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
