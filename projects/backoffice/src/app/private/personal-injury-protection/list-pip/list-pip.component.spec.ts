import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPipComponent } from './list-pip.component';

describe('ListPipComponent', () => {
  let component: ListPipComponent;
  let fixture: ComponentFixture<ListPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
