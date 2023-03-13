import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFunctionariesComponent } from './register-functionaries.component';

describe('RegisterFunctionariesComponent', () => {
  let component: RegisterFunctionariesComponent;
  let fixture: ComponentFixture<RegisterFunctionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFunctionariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFunctionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
