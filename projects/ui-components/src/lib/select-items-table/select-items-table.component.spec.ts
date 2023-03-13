import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemsTableComponent } from './select-items-table.component';

describe('SelectItemsTableComponent', () => {
  let component: SelectItemsTableComponent;
  let fixture: ComponentFixture<SelectItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
