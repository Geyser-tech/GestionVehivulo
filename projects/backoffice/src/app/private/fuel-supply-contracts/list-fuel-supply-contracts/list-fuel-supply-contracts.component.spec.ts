import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuelSupplyContractsComponent } from './list-fuel-supply-contracts.component';

describe('ListFuelSupplyContractsComponent', () => {
  let component: ListFuelSupplyContractsComponent;
  let fixture: ComponentFixture<ListFuelSupplyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFuelSupplyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFuelSupplyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
