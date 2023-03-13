import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeFuelSupplyContractsComponent } from './unsuscribe-fuel-supply-contracts.component';

describe('UnsuscribeFuelSupplyContractsComponent', () => {
  let component: UnsuscribeFuelSupplyContractsComponent;
  let fixture: ComponentFixture<UnsuscribeFuelSupplyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeFuelSupplyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeFuelSupplyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
