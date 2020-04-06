import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCommunityComponent } from './wallet-community.component';

describe('WalletCommunityComponent', () => {
  let component: WalletCommunityComponent;
  let fixture: ComponentFixture<WalletCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
