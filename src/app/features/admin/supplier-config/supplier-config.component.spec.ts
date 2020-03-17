import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierConfigComponent } from './supplier-config.component';

describe('SupplierConfigComponent', () => {
  let component: SupplierConfigComponent;
  let fixture: ComponentFixture<SupplierConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
