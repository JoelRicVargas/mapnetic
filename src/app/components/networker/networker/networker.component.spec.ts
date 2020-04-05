import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { networkerComponent } from './networker.component';

describe('ProfileComponent', () => {
  let component: networkerComponent;
  let fixture: ComponentFixture<networkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ networkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(networkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
