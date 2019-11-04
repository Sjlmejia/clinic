import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendCreateComponent } from './attend-create.component';

describe('AttendCreateComponent', () => {
  let component: AttendCreateComponent;
  let fixture: ComponentFixture<AttendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
