import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasestatsComponent } from './basestats.component';

describe('BasestatsComponent', () => {
  let component: BasestatsComponent;
  let fixture: ComponentFixture<BasestatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasestatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
