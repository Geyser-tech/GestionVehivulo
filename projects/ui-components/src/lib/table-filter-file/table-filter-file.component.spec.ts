import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterFileComponent } from './table-filter-file.component';

describe('TableFilterFileComponent', () => {
  let component: TableFilterFileComponent;
  let fixture: ComponentFixture<TableFilterFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFilterFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
