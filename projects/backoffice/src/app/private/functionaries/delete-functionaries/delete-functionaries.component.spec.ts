import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFunctionariesComponent } from './delete-functionaries.component';

describe('DeleteFunctionariesComponent', () => {
  let component: DeleteFunctionariesComponent;
  let fixture: ComponentFixture<DeleteFunctionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFunctionariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFunctionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
