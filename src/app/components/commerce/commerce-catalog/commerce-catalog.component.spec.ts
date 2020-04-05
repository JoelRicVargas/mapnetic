import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceCatalogComponent } from './commerce-catalog.component';

describe('CommerceCatalogComponent', () => {
  let component: CommerceCatalogComponent;
  let fixture: ComponentFixture<CommerceCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
