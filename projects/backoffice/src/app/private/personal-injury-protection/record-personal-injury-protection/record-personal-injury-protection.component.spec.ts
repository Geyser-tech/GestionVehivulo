import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPersonalInjuryProtectionComponent } from './record-personal-injury-protection.component';

describe('RecordPersonalInjuryProtectionComponent', () => {
  let component: RecordPersonalInjuryProtectionComponent;
  let fixture: ComponentFixture<RecordPersonalInjuryProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordPersonalInjuryProtectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPersonalInjuryProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
