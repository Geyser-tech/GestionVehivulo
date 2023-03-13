import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPrintComponent } from './search-print.component';

describe('SearchPrintComponent', () => {
  let component: SearchPrintComponent;
  let fixture: ComponentFixture<SearchPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
