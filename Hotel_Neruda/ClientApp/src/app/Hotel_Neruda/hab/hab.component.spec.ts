import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabComponent } from './hab.component';

describe('HabComponent', () => {
  let component: HabComponent;
  let fixture: ComponentFixture<HabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
