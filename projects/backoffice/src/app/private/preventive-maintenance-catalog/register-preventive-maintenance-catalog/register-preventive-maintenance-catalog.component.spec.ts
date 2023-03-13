import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPreventiveMaintenanceCatalogComponent } from './register-preventive-maintenance-catalog.component';

describe('RegisterPreventiveMaintenanceCatalogComponent', () => {
  let component: RegisterPreventiveMaintenanceCatalogComponent;
  let fixture: ComponentFixture<RegisterPreventiveMaintenanceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPreventiveMaintenanceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPreventiveMaintenanceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
