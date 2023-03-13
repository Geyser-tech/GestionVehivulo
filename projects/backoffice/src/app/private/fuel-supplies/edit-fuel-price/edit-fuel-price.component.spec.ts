import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuelPriceComponent } from './edit-fuel-price.component';

describe('EditFuelPriceComponent', () => {
  let component: EditFuelPriceComponent;
  let fixture: ComponentFixture<EditFuelPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFuelPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
