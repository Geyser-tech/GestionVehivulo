import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribePipComponent } from './unsuscribe-pip.component';

describe('UnsuscribePipComponent', () => {
  let component: UnsuscribePipComponent;
  let fixture: ComponentFixture<UnsuscribePipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribePipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribePipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
