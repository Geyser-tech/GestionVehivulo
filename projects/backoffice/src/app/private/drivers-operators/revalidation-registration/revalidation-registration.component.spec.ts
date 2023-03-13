import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidationRegistrationComponent } from './revalidation-registration.component';

describe('RevalidationRegistrationComponent', () => {
  let component: RevalidationRegistrationComponent;
  let fixture: ComponentFixture<RevalidationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevalidationRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
