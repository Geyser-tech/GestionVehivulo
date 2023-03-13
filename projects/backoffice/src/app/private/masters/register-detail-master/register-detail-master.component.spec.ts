import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetailMasterComponent } from './register-detail-master.component';

describe('RegisterDetailMasterComponent', () => {
  let component: RegisterDetailMasterComponent;
  let fixture: ComponentFixture<RegisterDetailMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDetailMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
