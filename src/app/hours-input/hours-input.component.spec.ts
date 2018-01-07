import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursInputComponent } from './hours-input.component';

describe('HoursInputComponent', () => {
  let component: HoursInputComponent;
  let fixture: ComponentFixture<HoursInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
