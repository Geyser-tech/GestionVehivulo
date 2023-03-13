import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDriversLicensesComponent } from './show-drivers-licenses.component';

describe('ShowDriversLicensesComponent', () => {
  let component: ShowDriversLicensesComponent;
  let fixture: ComponentFixture<ShowDriversLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDriversLicensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriversLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
