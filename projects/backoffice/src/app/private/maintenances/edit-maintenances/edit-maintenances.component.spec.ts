import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenancesComponent } from './edit-maintenances.component';

describe('EditMaintenancesComponent', () => {
  let component: EditMaintenancesComponent;
  let fixture: ComponentFixture<EditMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaintenancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
