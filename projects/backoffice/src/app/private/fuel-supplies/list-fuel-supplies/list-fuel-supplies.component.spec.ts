import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuelSuppliesComponent } from './list-fuel-supplies.component';

describe('ListFuelSuppliesComponent', () => {
  let component: ListFuelSuppliesComponent;
  let fixture: ComponentFixture<ListFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
