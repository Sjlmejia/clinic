import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendListComponent } from './attend-list.component';

describe('AttendListComponent', () => {
  let component: AttendListComponent;
  let fixture: ComponentFixture<AttendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
