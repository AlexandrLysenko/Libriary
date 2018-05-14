import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionBooksComponent } from './fiction-books.component';

describe('FictionBooksComponent', () => {
  let component: FictionBooksComponent;
  let fixture: ComponentFixture<FictionBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FictionBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FictionBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
