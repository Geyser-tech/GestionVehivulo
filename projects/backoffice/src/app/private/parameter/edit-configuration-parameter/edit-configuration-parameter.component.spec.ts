import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigurationParameterComponent } from './edit-configuration-parameter.component';

describe('EditConfigurationParameterComponent', () => {
  let component: EditConfigurationParameterComponent;
  let fixture: ComponentFixture<EditConfigurationParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfigurationParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigurationParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
