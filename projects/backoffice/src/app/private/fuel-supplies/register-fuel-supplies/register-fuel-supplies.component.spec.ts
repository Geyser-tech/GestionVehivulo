import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFuelSuppliesComponent } from './register-fuel-supplies.component';

describe('RegisterFuelSuppliesComponent', () => {
  let component: RegisterFuelSuppliesComponent;
  let fixture: ComponentFixture<RegisterFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
