import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleInspectionsComponent } from './register-vehicle-inspections.component';

describe('RegisterVehicleInspectionsComponent', () => {
  let component: RegisterVehicleInspectionsComponent;
  let fixture: ComponentFixture<RegisterVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
