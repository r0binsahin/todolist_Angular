import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTodosComponent } from './display-todos.component';

describe('DisplayTodosComponent', () => {
  let component: DisplayTodosComponent;
  let fixture: ComponentFixture<DisplayTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayTodosComponent]
    });
    fixture = TestBed.createComponent(DisplayTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
