import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayedComponent } from './overlayed.component';

describe('OverlayedComponent', () => {
  let component: OverlayedComponent;
  let fixture: ComponentFixture<OverlayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
