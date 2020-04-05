import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkerProfile } from './networker-profile.component';

describe('ProfileComponent', () => {
  let component: NetworkerProfile;
  let fixture: ComponentFixture<NetworkerProfile>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkerProfile ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkerProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
