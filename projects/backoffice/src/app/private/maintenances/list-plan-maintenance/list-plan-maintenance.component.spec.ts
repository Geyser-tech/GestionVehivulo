import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanMaintenanceComponent } from './list-plan-maintenance.component';

describe('ListPlanMaintenanceComponent', () => {
  let component: ListPlanMaintenanceComponent;
  let fixture: ComponentFixture<ListPlanMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlanMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
