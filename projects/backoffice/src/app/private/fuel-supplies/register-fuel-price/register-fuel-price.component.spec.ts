import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFuelPriceComponent } from './register-fuel-price.component';

describe('RegisterFuelPriceComponent', () => {
  let component: RegisterFuelPriceComponent;
  let fixture: ComponentFixture<RegisterFuelPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFuelPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFuelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
