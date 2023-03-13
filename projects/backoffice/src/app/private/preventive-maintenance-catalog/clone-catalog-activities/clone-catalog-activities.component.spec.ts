import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneCatalogActivitiesComponent } from './clone-catalog-activities.component';

describe('CloneCatalogActivitiesComponent', () => {
  let component: CloneCatalogActivitiesComponent;
  let fixture: ComponentFixture<CloneCatalogActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneCatalogActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneCatalogActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
