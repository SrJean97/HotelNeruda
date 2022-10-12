import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaModComponent } from './reserva-mod.component';

describe('ReservaModComponent', () => {
  let component: ReservaModComponent;
  let fixture: ComponentFixture<ReservaModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
