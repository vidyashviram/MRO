import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyDetailsComponent } from './warranty-details.component';

describe('WarrantyDetailsComponent', () => {
  let component: WarrantyDetailsComponent;
  let fixture: ComponentFixture<WarrantyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
