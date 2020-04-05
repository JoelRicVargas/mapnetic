import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBannerComponent } from './wallet-banner.component';

describe('WalletBannerComponent', () => {
  let component: WalletBannerComponent;
  let fixture: ComponentFixture<WalletBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
