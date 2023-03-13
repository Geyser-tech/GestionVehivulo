import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFuelSupplyContractsComponent } from './show-fuel-supply-contracts.component';

describe('ShowFuelSupplyContractsComponent', () => {
  let component: ShowFuelSupplyContractsComponent;
  let fixture: ComponentFixture<ShowFuelSupplyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFuelSupplyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFuelSupplyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
