import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbserverConfigComponent } from './dbserver-config.component';

describe('DbserverConfigComponent', () => {
  let component: DbserverConfigComponent;
  let fixture: ComponentFixture<DbserverConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbserverConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbserverConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
