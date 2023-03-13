import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMobilityRequestComponent } from './edit-mobility-request.component';

describe('EditMobilityRequestComponent', () => {
  let component: EditMobilityRequestComponent;
  let fixture: ComponentFixture<EditMobilityRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMobilityRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMobilityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
