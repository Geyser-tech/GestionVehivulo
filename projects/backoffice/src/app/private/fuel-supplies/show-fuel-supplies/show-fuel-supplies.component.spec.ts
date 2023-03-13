import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFuelSuppliesComponent } from './show-fuel-supplies.component';

describe('ShowFuelSuppliesComponent', () => {
  let component: ShowFuelSuppliesComponent;
  let fixture: ComponentFixture<ShowFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
