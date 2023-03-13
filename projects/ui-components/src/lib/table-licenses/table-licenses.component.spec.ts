import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLicensesComponent } from './table-licenses.component';

describe('TableLicensesComponent', () => {
  let component: TableLicensesComponent;
  let fixture: ComponentFixture<TableLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLicensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
