import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehicleInspectionsComponent } from './show-vehicle-inspections.component';

describe('ShowVehicleInspectionsComponent', () => {
  let component: ShowVehicleInspectionsComponent;
  let fixture: ComponentFixture<ShowVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
