import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryVehicleAssignmentComponent } from './show-history-vehicle-assignment.component';

describe('ShowHistoryVehicleAssignmentComponent', () => {
  let component: ShowHistoryVehicleAssignmentComponent;
  let fixture: ComponentFixture<ShowHistoryVehicleAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHistoryVehicleAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHistoryVehicleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
