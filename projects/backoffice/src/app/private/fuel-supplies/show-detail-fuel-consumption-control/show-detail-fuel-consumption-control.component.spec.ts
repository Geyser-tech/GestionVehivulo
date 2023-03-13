import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailFuelConsumptionControlComponent } from './show-detail-fuel-consumption-control.component';

describe('ShowDetailFuelConsumptionControlComponent', () => {
  let component: ShowDetailFuelConsumptionControlComponent;
  let fixture: ComponentFixture<ShowDetailFuelConsumptionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailFuelConsumptionControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailFuelConsumptionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
