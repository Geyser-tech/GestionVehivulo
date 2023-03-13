import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFunctionariesComponent } from './edit-functionaries.component';

describe('EditFunctionariesComponent', () => {
  let component: EditFunctionariesComponent;
  let fixture: ComponentFixture<EditFunctionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFunctionariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFunctionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
