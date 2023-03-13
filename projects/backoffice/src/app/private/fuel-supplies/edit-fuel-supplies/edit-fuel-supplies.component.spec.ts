import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuelSuppliesComponent } from './edit-fuel-supplies.component';

describe('EditFuelSuppliesComponent', () => {
  let component: EditFuelSuppliesComponent;
  let fixture: ComponentFixture<EditFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
