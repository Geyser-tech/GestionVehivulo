import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehicleInspectionsComponent } from './list-vehicle-inspections.component';

describe('ListVehicleInspectionsComponent', () => {
  let component: ListVehicleInspectionsComponent;
  let fixture: ComponentFixture<ListVehicleInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehicleInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehicleInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
