import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRolComponent } from './show-rol.component';

describe('ShowRolComponent', () => {
  let component: ShowRolComponent;
  let fixture: ComponentFixture<ShowRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
