import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDriversOperatorsComponent } from './show-drivers-operators.component';

describe('ShowDriversOperatorsComponent', () => {
  let component: ShowDriversOperatorsComponent;
  let fixture: ComponentFixture<ShowDriversOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDriversOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriversOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
