import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageBannerComponent } from './package-banner.component';

describe('PackageBannerComponent', () => {
  let component: PackageBannerComponent;
  let fixture: ComponentFixture<PackageBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
