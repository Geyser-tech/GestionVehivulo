import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParameterComponent } from './register-parameter.component';

describe('RegisterParameterComponent', () => {
  let component: RegisterParameterComponent;
  let fixture: ComponentFixture<RegisterParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
