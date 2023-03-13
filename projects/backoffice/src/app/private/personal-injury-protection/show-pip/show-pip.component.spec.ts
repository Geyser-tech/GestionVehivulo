import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPipComponent } from './show-pip.component';

describe('ShowPipComponent', () => {
  let component: ShowPipComponent;
  let fixture: ComponentFixture<ShowPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
