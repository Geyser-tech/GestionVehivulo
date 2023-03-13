import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPipComponent } from './edit-pip.component';

describe('EditPipComponent', () => {
  let component: EditPipComponent;
  let fixture: ComponentFixture<EditPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
