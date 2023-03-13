import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribePlanMaintenanceComponent } from './unsuscribe-plan-maintenance.component';

describe('UnsuscribePlanMaintenanceComponent', () => {
  let component: UnsuscribePlanMaintenanceComponent;
  let fixture: ComponentFixture<UnsuscribePlanMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribePlanMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribePlanMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
