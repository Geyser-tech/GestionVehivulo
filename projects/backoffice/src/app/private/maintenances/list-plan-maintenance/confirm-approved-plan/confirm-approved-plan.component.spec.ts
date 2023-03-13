import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmApprovedPlanComponent } from './confirm-approved-plan.component';

describe('ConfirmApprovedPlanComponent', () => {
  let component: ConfirmApprovedPlanComponent;
  let fixture: ComponentFixture<ConfirmApprovedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmApprovedPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmApprovedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
