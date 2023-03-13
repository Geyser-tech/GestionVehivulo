import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCheckBoxFilterComponent } from './multi-check-box-filter.component';

describe('MultiCheckBoxFilterComponent', () => {
  let component: MultiCheckBoxFilterComponent;
  let fixture: ComponentFixture<MultiCheckBoxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCheckBoxFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCheckBoxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
