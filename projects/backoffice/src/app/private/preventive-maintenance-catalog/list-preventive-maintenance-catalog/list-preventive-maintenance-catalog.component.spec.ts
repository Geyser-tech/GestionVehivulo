import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreventiveMaintenanceCatalogComponent } from './list-preventive-maintenance-catalog.component';

describe('ListPreventiveMaintenanceCatalogComponent', () => {
  let component: ListPreventiveMaintenanceCatalogComponent;
  let fixture: ComponentFixture<ListPreventiveMaintenanceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreventiveMaintenanceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreventiveMaintenanceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
