import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfigurationParameterComponent } from './add-configuration-parameter.component';

describe('AddConfigurationParameterComponent', () => {
  let component: AddConfigurationParameterComponent;
  let fixture: ComponentFixture<AddConfigurationParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfigurationParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConfigurationParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
