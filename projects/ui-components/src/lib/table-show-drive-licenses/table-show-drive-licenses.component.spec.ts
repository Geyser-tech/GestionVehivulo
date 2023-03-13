import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShowDriveLicensesComponent } from './table-show-drive-licenses.component';

describe('TableShowDriveLicensesComponent', () => {
  let component: TableShowDriveLicensesComponent;
  let fixture: ComponentFixture<TableShowDriveLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableShowDriveLicensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShowDriveLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
