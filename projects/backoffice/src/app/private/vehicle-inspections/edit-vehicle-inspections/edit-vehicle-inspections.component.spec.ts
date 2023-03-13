import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleInspectionsComponent } from './edit-vehicle-inspections.component';

describe('EditVehicleInspectionsComponent', () => {
  let component: EditVehicleInspectionsComponent;
  let fixture: ComponentFixture<EditVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
