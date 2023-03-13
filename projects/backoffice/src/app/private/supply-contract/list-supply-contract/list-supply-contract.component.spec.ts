import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplyContractComponent } from './list-supply-contract.component';

describe('ListSupplyContractComponent', () => {
  let component: ListSupplyContractComponent;
  let fixture: ComponentFixture<ListSupplyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupplyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
