import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCommonFormComponent } from './work-order-common-form.component';

describe('WorkOrderCommonFormComponent', () => {
  let component: WorkOrderCommonFormComponent;
  let fixture: ComponentFixture<WorkOrderCommonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCommonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCommonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
