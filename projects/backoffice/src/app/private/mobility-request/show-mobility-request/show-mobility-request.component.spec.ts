import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMobilityRequestComponent } from './show-mobility-request.component';

describe('ShowMobilityRequestComponent', () => {
  let component: ShowMobilityRequestComponent;
  let fixture: ComponentFixture<ShowMobilityRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMobilityRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMobilityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
