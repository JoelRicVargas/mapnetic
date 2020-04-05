import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceBannerComponent } from './commerce-banner.component';

describe('CommerceBannerComponent', () => {
  let component: CommerceBannerComponent;
  let fixture: ComponentFixture<CommerceBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
