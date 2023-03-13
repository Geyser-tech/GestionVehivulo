import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplyContractComponent } from './register-supply-contract.component';

describe('RegisterSupplyContractComponent', () => {
  let component: RegisterSupplyContractComponent;
  let fixture: ComponentFixture<RegisterSupplyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSupplyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSupplyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
