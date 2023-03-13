import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterAlertsComponent } from './table-filter-alerts.component';

describe('TableFilterAlertsComponent', () => {
  let component: TableFilterAlertsComponent;
  let fixture: ComponentFixture<TableFilterAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFilterAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
