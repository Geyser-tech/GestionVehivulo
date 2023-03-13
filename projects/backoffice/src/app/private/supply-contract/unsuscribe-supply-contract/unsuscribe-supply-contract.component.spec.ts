import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeSupplyContractComponent } from './unsuscribe-supply-contract.component';

describe('UnsuscribeSupplyContractComponent', () => {
  let component: UnsuscribeSupplyContractComponent;
  let fixture: ComponentFixture<UnsuscribeSupplyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeSupplyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeSupplyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
