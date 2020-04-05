import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkerBannerComponent } from './networker-banner.component';

describe('BannerComponent', () => {
  let component: NetworkerBannerComponent;
  let fixture: ComponentFixture<NetworkerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkerBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
