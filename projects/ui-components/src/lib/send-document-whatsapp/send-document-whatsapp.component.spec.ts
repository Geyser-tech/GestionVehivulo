import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDocumentWhatsappComponent } from './send-document-whatsapp.component';

describe('SendDocumentWhatsappComponent', () => {
  let component: SendDocumentWhatsappComponent;
  let fixture: ComponentFixture<SendDocumentWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendDocumentWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDocumentWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
