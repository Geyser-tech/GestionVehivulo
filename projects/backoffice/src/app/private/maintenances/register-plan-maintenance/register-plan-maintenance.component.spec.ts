import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlanMaintenanceComponent } from './register-plan-maintenance.component';

describe('RegisterPlanMaintenanceComponent', () => {
  let component: RegisterPlanMaintenanceComponent;
  let fixture: ComponentFixture<RegisterPlanMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPlanMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlanMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
