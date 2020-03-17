import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftDispositionComponent } from './aircraft-disposition.component';

describe('AircraftDispositionComponent', () => {
  let component: AircraftDispositionComponent;
  let fixture: ComponentFixture<AircraftDispositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftDispositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
