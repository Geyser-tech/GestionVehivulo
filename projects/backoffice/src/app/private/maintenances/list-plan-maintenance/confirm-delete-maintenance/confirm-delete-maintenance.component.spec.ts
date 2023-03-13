import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteMaintenanceComponent } from './confirm-delete-maintenance.component';

describe('ConfirmDeleteMaintenanceComponent', () => {
  let component: ConfirmDeleteMaintenanceComponent;
  let fixture: ComponentFixture<ConfirmDeleteMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
