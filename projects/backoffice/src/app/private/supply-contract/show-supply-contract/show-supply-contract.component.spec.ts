import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSupplyContractComponent } from './show-supply-contract.component';

describe('ShowSupplyContractComponent', () => {
  let component: ShowSupplyContractComponent;
  let fixture: ComponentFixture<ShowSupplyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSupplyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSupplyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
