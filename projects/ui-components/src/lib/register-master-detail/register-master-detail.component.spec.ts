import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMasterDetailComponent } from './register-master-detail.component';

describe('RegisterMasterDetailComponent', () => {
  let component: RegisterMasterDetailComponent;
  let fixture: ComponentFixture<RegisterMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMasterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
