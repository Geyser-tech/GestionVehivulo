import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailFuelConsumptionComponent } from './list-detail-fuel-consumption.component';

describe('ListDetailFuelConsumptionComponent', () => {
  let component: ListDetailFuelConsumptionComponent;
  let fixture: ComponentFixture<ListDetailFuelConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetailFuelConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailFuelConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
