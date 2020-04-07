import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomHelpComponent } from './buttom-help.component';

describe('ButtomHelpComponent', () => {
  let component: ButtomHelpComponent;
  let fixture: ComponentFixture<ButtomHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
