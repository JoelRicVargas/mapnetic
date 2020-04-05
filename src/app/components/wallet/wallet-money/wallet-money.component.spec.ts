import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletMoneyComponent } from './wallet-money.component';

describe('WalletMoneyComponent', () => {
  let component: WalletMoneyComponent;
  let fixture: ComponentFixture<WalletMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
