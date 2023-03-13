import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuelPriceComponent } from './list-fuel-price.component';

describe('ListFuelPriceComponent', () => {
  let component: ListFuelPriceComponent;
  let fixture: ComponentFixture<ListFuelPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFuelPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFuelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
