import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPreventiveMaintenanceCatalogComponent } from './show-preventive-maintenance-catalog.component';

describe('ShowPreventiveMaintenanceCatalogComponent', () => {
  let component: ShowPreventiveMaintenanceCatalogComponent;
  let fixture: ComponentFixture<ShowPreventiveMaintenanceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPreventiveMaintenanceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPreventiveMaintenanceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
