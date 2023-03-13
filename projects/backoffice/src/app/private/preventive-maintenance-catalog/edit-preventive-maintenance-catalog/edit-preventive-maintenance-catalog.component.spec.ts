import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreventiveMaintenanceCatalogComponent } from './edit-preventive-maintenance-catalog.component';

describe('EditPreventiveMaintenanceCatalogComponent', () => {
  let component: EditPreventiveMaintenanceCatalogComponent;
  let fixture: ComponentFixture<EditPreventiveMaintenanceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPreventiveMaintenanceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreventiveMaintenanceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
