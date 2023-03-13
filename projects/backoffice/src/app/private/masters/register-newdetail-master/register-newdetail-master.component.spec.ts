import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewdetailMasterComponent } from './register-newdetail-master.component';

describe('RegisterNewdetailMasterComponent', () => {
  let component: RegisterNewdetailMasterComponent;
  let fixture: ComponentFixture<RegisterNewdetailMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewdetailMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewdetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
