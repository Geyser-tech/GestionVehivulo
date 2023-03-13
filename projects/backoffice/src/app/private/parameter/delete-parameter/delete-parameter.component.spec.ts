import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParameterComponent } from './delete-parameter.component';

describe('DeleteParameterComponent', () => {
  let component: DeleteParameterComponent;
  let fixture: ComponentFixture<DeleteParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
