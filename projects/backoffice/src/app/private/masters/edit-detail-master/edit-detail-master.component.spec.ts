import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailMasterComponent } from './edit-detail-master.component';

describe('EditDetailMasterComponent', () => {
  let component: EditDetailMasterComponent;
  let fixture: ComponentFixture<EditDetailMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
