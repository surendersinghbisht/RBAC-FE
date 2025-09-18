import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnouncements } from './add-announcements';

describe('AddAnnouncements', () => {
  let component: AddAnnouncements;
  let fixture: ComponentFixture<AddAnnouncements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnnouncements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnouncements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
