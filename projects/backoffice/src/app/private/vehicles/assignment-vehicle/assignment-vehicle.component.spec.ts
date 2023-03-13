import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentVehicleComponent } from './assignment-vehicle.component';

describe('AssignmentVehicleComponent', () => {
  let component: AssignmentVehicleComponent;
  let fixture: ComponentFixture<AssignmentVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
