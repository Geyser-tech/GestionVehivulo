import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunctionariesComponent } from './list-functionaries.component';

describe('ListFunctionariesComponent', () => {
  let component: ListFunctionariesComponent;
  let fixture: ComponentFixture<ListFunctionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFunctionariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFunctionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
