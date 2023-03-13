import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeFuelSuppliesComponent } from './unsuscribe-fuel-supplies.component';

describe('UnsuscribeFuelSuppliesComponent', () => {
  let component: UnsuscribeFuelSuppliesComponent;
  let fixture: ComponentFixture<UnsuscribeFuelSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeFuelSuppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeFuelSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
