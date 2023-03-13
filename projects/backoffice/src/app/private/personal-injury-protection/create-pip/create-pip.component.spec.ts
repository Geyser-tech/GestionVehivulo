import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePipComponent } from './create-pip.component';

describe('CreatePipComponent', () => {
  let component: CreatePipComponent;
  let fixture: ComponentFixture<CreatePipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
