import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeDriversOperatorsComponent } from './unsuscribe-drivers-operators.component';

describe('UnsuscribeDriversOperatorsComponent', () => {
  let component: UnsuscribeDriversOperatorsComponent;
  let fixture: ComponentFixture<UnsuscribeDriversOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeDriversOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeDriversOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
