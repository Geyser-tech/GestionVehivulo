import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDriversOperatorsComponent } from './register-drivers-operators.component';

describe('RegisterDriversOperatorsComponent', () => {
  let component: RegisterDriversOperatorsComponent;
  let fixture: ComponentFixture<RegisterDriversOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDriversOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDriversOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
