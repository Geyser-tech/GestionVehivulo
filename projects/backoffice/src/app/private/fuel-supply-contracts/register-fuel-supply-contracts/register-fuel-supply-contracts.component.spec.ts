import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFuelSupplyContractsComponent } from './register-fuel-supply-contracts.component';

describe('RegisterFuelSupplyContractsComponent', () => {
  let component: RegisterFuelSupplyContractsComponent;
  let fixture: ComponentFixture<RegisterFuelSupplyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFuelSupplyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFuelSupplyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
