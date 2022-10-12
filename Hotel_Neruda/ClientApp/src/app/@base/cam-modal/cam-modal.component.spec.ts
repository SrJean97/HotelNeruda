import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamModalComponent } from './cam-modal.component';

describe('CamModalComponent', () => {
  let component: CamModalComponent;
  let fixture: ComponentFixture<CamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
