import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMobilityRequestComponent } from './register-mobility-request.component';

describe('RegisterMobilityRequestComponent', () => {
  let component: RegisterMobilityRequestComponent;
  let fixture: ComponentFixture<RegisterMobilityRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMobilityRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMobilityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
