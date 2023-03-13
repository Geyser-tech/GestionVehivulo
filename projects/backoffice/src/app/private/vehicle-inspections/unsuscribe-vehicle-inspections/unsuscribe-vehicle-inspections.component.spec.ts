import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeVehicleInspectionsComponent } from './unsuscribe-vehicle-inspections.component';

describe('UnsuscribeVehicleInspectionsComponent', () => {
  let component: UnsuscribeVehicleInspectionsComponent;
  let fixture: ComponentFixture<UnsuscribeVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
