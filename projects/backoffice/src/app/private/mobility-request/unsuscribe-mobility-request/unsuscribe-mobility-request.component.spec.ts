import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeMobilityRequestComponent } from './unsuscribe-mobility-request.component';

describe('UnsuscribeMobilityRequestComponent', () => {
  let component: UnsuscribeMobilityRequestComponent;
  let fixture: ComponentFixture<UnsuscribeMobilityRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeMobilityRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeMobilityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
