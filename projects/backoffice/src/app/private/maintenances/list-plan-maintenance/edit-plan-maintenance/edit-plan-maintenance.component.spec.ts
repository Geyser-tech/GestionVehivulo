import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanMaintenanceComponent } from './edit-plan-maintenance.component';

describe('EditPlanMaintenanceComponent', () => {
  let component: EditPlanMaintenanceComponent;
  let fixture: ComponentFixture<EditPlanMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlanMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
