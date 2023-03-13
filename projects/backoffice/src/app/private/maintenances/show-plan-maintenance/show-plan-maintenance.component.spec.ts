import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanMaintenanceComponent } from './show-plan-maintenance.component';

describe('ShowPlanMaintenanceComponent', () => {
  let component: ShowPlanMaintenanceComponent;
  let fixture: ComponentFixture<ShowPlanMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlanMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlanMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
