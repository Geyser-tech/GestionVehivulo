import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMastersComponent } from './list-masters.component';

describe('ListMastersComponent', () => {
  let component: ListMastersComponent;
  let fixture: ComponentFixture<ListMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
