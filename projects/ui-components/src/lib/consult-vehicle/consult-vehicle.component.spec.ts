import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultVehicleComponent } from './consult-vehicle.component';

describe('ConsultVehicleComponent', () => {
  let component: ConsultVehicleComponent;
  let fixture: ComponentFixture<ConsultVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
