import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeVehicleComponent } from './unsuscribe-vehicle.component';

describe('UnsuscribeVehicleComponent', () => {
  let component: UnsuscribeVehicleComponent;
  let fixture: ComponentFixture<UnsuscribeVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
