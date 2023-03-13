import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaintenancesComponent } from './show-maintenances.component';

describe('ShowMaintenancesComponent', () => {
  let component: ShowMaintenancesComponent;
  let fixture: ComponentFixture<ShowMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMaintenancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
