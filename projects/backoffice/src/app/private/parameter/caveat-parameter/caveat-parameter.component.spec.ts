import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaveatParameterComponent } from './caveat-parameter.component';

describe('CaveatParameterComponent', () => {
  let component: CaveatParameterComponent;
  let fixture: ComponentFixture<CaveatParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaveatParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaveatParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
