import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBonusComponent } from './wallet-bonus.component';

describe('WalletBonusComponent', () => {
  let component: WalletBonusComponent;
  let fixture: ComponentFixture<WalletBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
