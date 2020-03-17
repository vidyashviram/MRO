import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderRepairComponent } from './work-order-repair.component';

describe('WorkOrderRepairComponent', () => {
  let component: WorkOrderRepairComponent;
  let fixture: ComponentFixture<WorkOrderRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
