import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpserverConfigComponent } from './smtpserver-config.component';

describe('SmtpserverConfigComponent', () => {
  let component: SmtpserverConfigComponent;
  let fixture: ComponentFixture<SmtpserverConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpserverConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpserverConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
