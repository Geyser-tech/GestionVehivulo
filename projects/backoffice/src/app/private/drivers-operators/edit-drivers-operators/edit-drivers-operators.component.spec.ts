import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriversOperatorsComponent } from './edit-drivers-operators.component';

describe('EditDriversOperatorsComponent', () => {
  let component: EditDriversOperatorsComponent;
  let fixture: ComponentFixture<EditDriversOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDriversOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDriversOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
