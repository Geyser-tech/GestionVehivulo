import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMaintenancesComponent } from './register-maintenances.component';

describe('RegisterMaintenancesComponent', () => {
  let component: RegisterMaintenancesComponent;
  let fixture: ComponentFixture<RegisterMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMaintenancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
