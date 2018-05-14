import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefullLinkComponent } from './usefull-link.component';

describe('UsefullLinkComponent', () => {
  let component: UsefullLinkComponent;
  let fixture: ComponentFixture<UsefullLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefullLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefullLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
