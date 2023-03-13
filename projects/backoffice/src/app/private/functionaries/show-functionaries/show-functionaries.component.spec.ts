import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFunctionariesComponent } from './show-functionaries.component';

describe('ShowFunctionariesComponent', () => {
  let component: ShowFunctionariesComponent;
  let fixture: ComponentFixture<ShowFunctionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFunctionariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFunctionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
