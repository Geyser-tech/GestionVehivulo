import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMastersComponent } from './register-masters.component';

describe('RegisterMastersComponent', () => {
  let component: RegisterMastersComponent;
  let fixture: ComponentFixture<RegisterMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
