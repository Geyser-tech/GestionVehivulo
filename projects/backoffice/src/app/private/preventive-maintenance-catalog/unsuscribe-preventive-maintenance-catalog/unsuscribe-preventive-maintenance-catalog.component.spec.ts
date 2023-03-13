import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribePreventiveMaintenanceCatalogComponent } from './unsuscribe-preventive-maintenance-catalog.component';

describe('UnsuscribePreventiveMaintenanceCatalogComponent', () => {
  let component: UnsuscribePreventiveMaintenanceCatalogComponent;
  let fixture: ComponentFixture<UnsuscribePreventiveMaintenanceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribePreventiveMaintenanceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribePreventiveMaintenanceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
