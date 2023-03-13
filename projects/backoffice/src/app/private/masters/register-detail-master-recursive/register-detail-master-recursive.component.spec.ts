import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetailMasterRecursiveComponent } from './register-detail-master-recursive.component';

describe('RegisterDetailMasterRecursiveComponent', () => {
  let component: RegisterDetailMasterRecursiveComponent;
  let fixture: ComponentFixture<RegisterDetailMasterRecursiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDetailMasterRecursiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDetailMasterRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
