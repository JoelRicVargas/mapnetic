import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageBuyComponent } from './package-buy.component';

describe('PackageBuyComponent', () => {
  let component: PackageBuyComponent;
  let fixture: ComponentFixture<PackageBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
