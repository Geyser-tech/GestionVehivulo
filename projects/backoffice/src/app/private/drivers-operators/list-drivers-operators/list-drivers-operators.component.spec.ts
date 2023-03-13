import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDriversOperatorsComponent } from './list-drivers-operators.component';

describe('ListDriversOperatorsComponent', () => {
  let component: ListDriversOperatorsComponent;
  let fixture: ComponentFixture<ListDriversOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDriversOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDriversOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
