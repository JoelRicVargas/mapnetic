import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDataComponent } from './wallet-data.component';

describe('WalletDataComponent', () => {
  let component: WalletDataComponent;
  let fixture: ComponentFixture<WalletDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
