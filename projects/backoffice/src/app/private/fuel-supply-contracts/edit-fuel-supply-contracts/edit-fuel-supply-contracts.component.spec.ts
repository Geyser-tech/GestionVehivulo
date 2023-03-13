import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuelSupplyContractsComponent } from './edit-fuel-supply-contracts.component';

describe('EditFuelSupplyContractsComponent', () => {
  let component: EditFuelSupplyContractsComponent;
  let fixture: ComponentFixture<EditFuelSupplyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFuelSupplyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelSupplyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
